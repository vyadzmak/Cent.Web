import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'factories',
  data () {
    return {
      msg: 'Проекты',
      search: '',
      errors: [],
      headers: [
        { text: 'ID', align: 'left', value: 'id' },
        { text: 'Наименование', align: 'left', value: 'name' },
        { text: 'Дата создания', align: 'left', value: 'creation_date' },
        { text: 'Клиент', align: 'left', value: 'user_data.client.name' },
        { text: 'Пользователь', align: 'left', value: 'user_data.last_name' },
        { text: 'Состояние', align: 'left', value: 'factory_state.name' }
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
          message: 'Вы действительно хотите удалить проект?',
          title: 'Удаление проекта',
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
      let isUpdate = false
      if (item.id) {
        isUpdate = true
      } else {
        item.fields = []
        item.group_title = ''
        item.is_catalog = false
        item.name = ''
        item.title = ''
        item.description = ''
        item.user_id = this.userData.id
        item.client_id = this.userData.client_id
      }

      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Добавление') + ' конструктора',
          isClosable: true,
          item: item
        }
      }
      ModalService.open(updateModal, modalConfig).then(
          modalSubmit => {
            this.updateItem(modalSubmit, isUpdate)
          },
          modalCancel => { console.log(modalCancel) }
      ).catch(err => { console.log(err) })
    },
    deleteItem: function (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('factory/' + itemId)
      .then(response => {
        if (response.data && response.data !== 'Error') {
          this.factories.splice(this.factories.findIndex((element, index, array) => {
            if (element.id === itemId) {
              return true
            }
          }), 1)
          this.$store.commit('showSnackbar', {text: 'Удаление проекта прошло успешно', snackbar: true, context: 'success'})
        } else {
          this.$store.commit('showSnackbar', {text: 'Удаление проекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        }
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: 'Удаление проекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    },
    updateItem: function (item, isUpdate) {
      this.$store.dispatch('updateFactory', {http: this.$http, isUpdate: isUpdate, item: item})
    },
    getAllFactories () {
      this.$store.dispatch('getAllFactories', this.$http)
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
