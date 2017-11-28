import questionDialog from '../questionDialog/questionDialog'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'factory',
  data () {
    let cFactory = _.cloneDeep(this.$store.getters.currentFactory)
    cFactory.data = JSON.parse(cFactory.data)
    return {
      msg: 'Конструкторы',
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

      currentType: null,
      factory: cFactory
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    },
    tableItems () {
      return _.get(this.factory, 'data.fields') ? this.factory.data.fields : []
    }
  },
  methods: {
    showDeleteModal: function (itemId) {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите удалить конструктор?',
          title: 'Удаление конструктора',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => { this.deleteItem(itemId) },
        modalCancel => {}
    ).catch(
      err => {
        console.log(err)
      }
    )
    },
    deleteItem: function (itemId) {
      this.$store.dispatch('deleteFactory', {id: itemId, http: this.$http})
    },
    updateItem: function (item, isUpdate) {
      item.data = JSON.stringify(item.data)
      this.$store.dispatch('updateFactory', {http: this.$http, isUpdate: isUpdate, item: item})
    },
    addField () {
      if (this.currentType.id) {
        let newField = {
          'field_type': this.currentType.id,
          'name': this.currentType.name,
          'title': this.currentType.title,
          'var': _.cloneDeep(this.currentType.var)
        }
        this.factory.data.fields.push(newField)
      }
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
