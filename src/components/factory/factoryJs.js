import questionDialog from '../questionDialog/questionDialog'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'factory',
  data () {
    let cFactory = _.cloneDeep(this.$store.getters.currentFactory)
    cFactory.data = JSON.parse(cFactory.data)
    return {
      msg: 'Конструктор объекта ' + cFactory.title,
      search: '',
      errors: [],
      headers: [
        { text: 'Type Id', align: 'left', value: 'type_id' },
        { text: 'Наименование', align: 'left', value: 'name' },
        { text: 'Заголовок', align: 'left', value: 'title' }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',

      factory: cFactory,
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
      return _.get(this.factory, 'data.fields') ? this.factory.data.fields : []
    },
    updateProperty () {
      return this.$store.getters.updateProperty ? this.$store.getters.updateProperty : []
    }
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
      item.data = JSON.stringify(item.data)
      this.$store.dispatch('updateFactory', {http: this.$http, isUpdate: isUpdate, item: _.cloneDeep(item)})
      .then(response => {
        this.factory.data = JSON.parse(response.data)
      })
      .catch(e => {
      })
      item.data = JSON.parse(item.data)
      item.data.fields[item.data.fields.length - 1].index = null
    },
    addField () {
      if (this.currentType) {
        if (this.currentType.id === 9) {
          this.$store.dispatch('getSchemaUpdateProperty', {http: this.$http, link: 'schemaCatalogs', id: this.userData.client_id})
        } else if (this.currentType.id === 5) {
          this.$store.dispatch('getSchemaUpdateProperty', {http: this.$http, link: 'schemaLinks', id: this.userData.client_id})
        }
        let newField = {
          'index': _.random(10000, 20000),
          'field_type': this.currentType.id,
          'name': this.currentType.name,
          'title': this.currentType.title,
          'var': _.cloneDeep(this.currentType.var)
        }
        this.factory.data.fields.push(newField)
      }
    },
    generateFormSchema (factory, updateProperty) {
      for (let i = 0; i < updateProperty.length; i++) {
        updateProperty[i].name = updateProperty[i].title
      }
      var schema = {}
      schema.fields = [{
        type: 'input',
        inputType: 'text',
        label: 'Наименование переменной',
        model: 'name',
        id: 'name',
        required: true
      }, {
        type: 'input',
        inputType: 'text',
        label: 'Заголовок переменной',
        model: 'title',
        id: 'title',
        required: true,
        rules: [
          (v) => !!v || 'Заголовок должен быть заполнено',
          (v) => v && v.length <= 270 || 'Не более 270 символов'
        ]
      }]

      _.forEach(factory.var, function (value, key) {
        var schemaItem = {
          type: 'input',
          inputType: 'text',
          label: key,
          model: 'var.' + key,
          id: key,
          required: true
        }
        if (key.indexOf('schema_id') === 0) {
          schemaItem.type = 'select'
          schemaItem.values = updateProperty
          schemaItem.required = true
        } else if (_.isBoolean(value)) {
          schemaItem.type = 'checkbox'
        } else if (_.isFinite(value)) {
          schemaItem.inputType = 'number'
        }
        schema.fields.push(schemaItem)
      })

      return schema
    },
    deleteFieldItem (index) {
      this.factory.data.fields.splice(index)
      this.updateItem(this.factory, true)
    }
  },
  created () {
  },
  mounted () {
    // this.$refs.factoryDataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
  }
}
