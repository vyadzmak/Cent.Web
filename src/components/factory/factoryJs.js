import questionDialog from '../questionDialog/QuestionDialog.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  inject: ['$validator'],
  name: 'factory',
  data () {
    return {
      search: '',
      errors: [],
      headers: [
        { text: 'Type Id', align: 'left', value: 'type_id' },
        { text: 'Наименование', align: 'left', value: 'name' },
        { text: 'Заголовок', align: 'left', value: 'title' },
        { sortable: false }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      currentType: null,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        fieldIdPrefix: 'prefix-'
      }
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    },
    tableItems () {
      return !!this.factory && !!this.factory.data && !!this.factory.data.fields ? this.factory.data.fields : []
    },
    updateProperty () {
      return this.$store.getters.updateProperty ? this.$store.getters.updateProperty : []
    },
    factory: {
      get: function () {
        let cFactory = this.$store.getters.currentFactory
        _.forEach(cFactory.data.fields, function (value, key) {
          let result = _.find(cFactory.data.var_descritpions.variables, function (o) { return o.id === value.field_type })
          value.type_title = result ? result.title : ''
        })
        return cFactory
      },
      set (value) { this.$store.commit('CURRENT_FACTORY', value) }
    },
    listOfTypes () {
      if (this.$store.getters.currentFactory.data.var_descritpions.variables) {
        return this.$store.getters.currentFactory.data.var_descritpions.variables
      } else { return [] }
    },
    msg () { return 'Конструктор схемы "' + (this.factory ? this.factory.title : '') + '"' }
  },
  methods: {
    showDeleteModal: function (itemId) {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите удалить поле конструктора?',
          title: 'Удаление поля',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => { this.deleteFieldItem(itemId) },
        modalCancel => {}
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    updateItem: function (item, isUpdate) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          item.data = JSON.stringify(item.data)
          this.$store.dispatch('updateFactory', {isUpdate: isUpdate, item: _.cloneDeep(item)})
            .then(response => {})
            .catch(e => {})
          item.data = JSON.parse(item.data)
          item.data.fields[item.data.fields.length - 1].index = null
        }
      })
    },
    addField () {
      if (this.currentType) {
        if (this.currentType.id === 9) {
          this.$store.dispatch('getSchemaUpdateProperty', {link: 'schemaCatalogs', id: this.userData.client_id})
        } else if (this.currentType.id === 5) {
          this.$store.dispatch('getSchemaUpdateProperty', {link: 'schemaLinks', id: this.userData.client_id})
        }
        let newField = {
          'index': _.random(10000, 20000),
          'field_type': this.currentType.id,
          'type_title': this.getFieldTypeName(this.currentType.id, this.factory.data.var_descritpions.variables),
          'name': this.currentType.name,
          'title': this.currentType.title,
          'var': _.cloneDeep(this.currentType.var)
        }

        this.$store.commit('addElementToArray', {path: 'factories.currentFactory.data.fields', value: newField})

        // let factory = Object.assign({}, this.factory)
        // factory.data.fields.push(newField)
        // this.factory = factory
      }
    },
    generateFormSchema (factory, updateProperty) {
      for (let i = 0; i < updateProperty.length; i++) {
        updateProperty[i].name = updateProperty[i].title
      }
      var schema = {}
      schema.fields = [{
        type: 'vtext',
        inputType: 'text',
        label: 'Наименование переменной',
        model: 'name',
        id: 1,
        name: 'name',
        required: true,
        veePipe: 'required|min:2|max:20|alpha_dash'
      }, {
        type: 'vtext',
        inputType: 'text',
        label: 'Заголовок переменной',
        model: 'title',
        id: 2,
        name: 'title',
        required: true,
        veePipe: 'required|max:40|alpha_spaces'
      }, {
        type: 'vcheckbox',
        label: 'Индекс',
        model: 'is_index',
        id: 3,
        name: 'is_index',
        veePipe: ''
      }, {
        type: 'vcheckbox',
        label: 'Значение',
        model: 'is_value',
        id: 4,
        name: 'is_value',
        veePipe: ''
      }, {
        type: 'vcheckbox',
        label: 'Видимость',
        model: 'is_visible',
        id: 5,
        name: 'is_visible',
        veePipe: ''
      }]

      _.forEach(factory.var, function (value, key) {
        var schemaItem = {
          type: 'vtext',
          inputType: 'text',
          label: key,
          model: 'var.' + key,
          id: key + 6,
          name: 'var.' + key
        }
        if (key.indexOf('schema_id') === 0) {
          schemaItem.type = 'vselect'
          schemaItem.items = updateProperty
        } else if (_.isBoolean(value)) {
          schemaItem.type = 'vcheckbox'
          schemaItem.required = false
          schemaItem.veePipe = ''
        } else if (_.isFinite(value)) {
          schemaItem.inputType = 'number'
          schemaItem.veePipe = '|decimal:0'
        }
        schema.fields.push(schemaItem)
      })

      return schema
    },
    deleteFieldItem (index) {
      this.factory.data.fields.splice(index)
      this.updateItem(this.factory, true)
    },
    getFieldTypeName (fieldTypeId, collection) {
      let result = _.find(collection, function (o) { return o.id === fieldTypeId })
      return result ? result.title : ''
    }
  },
  created () {
  },
  mounted () {
    this.$refs.factoryDataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
  }
}
