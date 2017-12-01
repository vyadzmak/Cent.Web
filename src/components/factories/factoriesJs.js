import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'factories',
  data () {
    return {
      msg: 'Конструкторы',
      search: '',
      errors: [],
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Наименование', align: 'left', value: 'name' },
        { text: 'Заголовок', align: 'left', value: 'title' },
        { text: 'Описание', align: 'left', value: 'description' },
        { text: 'Дата создания', align: 'left', value: 'creation_date' },
        { text: 'Тип', align: 'left', value: 'is_catalog' },
        { text: 'Id польз.', align: 'left', value: 'user_id' }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов'
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    },
    factories: function () {
      return this.$store.getters.factories
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
    showUpdateModal: function (item) {
      this.$store.dispatch('getSchemaUpdateProperty', {http: this.$http, link: 'schemaTypes', id: null})
      let isUpdate = false
      if (item.id) {
        isUpdate = true
      } else {
        item.fields = []
        item.group_title = ''
        item.schema_type_id = 0
        item.name = ''
        item.title = ''
        item.description = ''
        item.user_id = this.userData.id
        item.client_id = this.userData.client_id
      }

      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Создание') + ' схемы объекта',
          isClosable: true,
          item: isUpdate ? _.cloneDeep(item) : item
        }
      }
      this.$store.dispatch('getSchemaUpdateProperty', {http: this.$http, link: 'schemaTypes', id: null})
      .then(response => {
        ModalService.open(updateModal, modalConfig).then(
          modalSubmit => {
            this.updateItem(modalSubmit, isUpdate)
          },
          modalCancel => { console.log(modalCancel) }
      ).catch(err => { console.log(err) })
      })
    },
    deleteItem: function (itemId) {
      this.$store.dispatch('deleteFactory', {id: itemId, http: this.$http})
    },
    updateItem: function (item, isUpdate) {
      this.$store.dispatch('updateFactory', {http: this.$http, isUpdate: isUpdate, item: item})
    },
    getAllFactories () {
      this.$store.dispatch('getAllFactories', this.$http)
    },
    goToFactory (item) {
      this.$store.commit('CURRENT_FACTORY', item)
      this.$router.push({name: 'Factory', params: {id: item.id}})
    },
    getSchemaTypeName (id) {
      switch (id) {
        case 0: return 'Объект'
        case 1: return 'Субъект'
        case 2: return 'Документ'
        case 3: return 'Справочник'
      }
    }
  },
  created () {
    this.getAllFactories()
  },
  mounted () {
    this.$refs.factoriesDataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
  }
}
