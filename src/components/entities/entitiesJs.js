import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'entities',
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
        { text: 'Состояние', align: 'left', value: 'entity_state.name' }
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
    entities: function () {
      return this.$store.getters.entities
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
    updatePressed (item) { console.log(item) },
    showUpdateModal: function (item) {
      let isUpdate = false
      if (item.id) {
        isUpdate = true
      }

      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Добавление') + ' проекта',
          isClosable: true,
          item: isUpdate ? Object.assign({}, item) : item
        }
      }
      ModalService.open(updateModal, modalConfig).then(
          modalSubmit => {
            this.getAllEntities()
          },
          modalCancel => { console.log(modalCancel) }
      ).catch(err => { console.log(err) })
    },
    deleteItem: function (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('entity/' + itemId)
      .then(response => {
        if (response.data && response.data !== 'Error') {
          this.entities.splice(this.entities.findIndex((element, index, array) => {
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
      this.$store.dispatch('updateEntity', {http: this.$http, isUpdate: isUpdate, entity: item})
    },
    goToEntity (item) {
      this.$store.commit('CURRENT_ENTITY', item)
      this.$router.push({name: 'Entity', params: {id: item.id}})
    },
    getAllEntities (isSilent) {
      this.$store.dispatch('getAllEntities', this.$http, isSilent)
    }
  },
  created () {
    this.getAllEntities()
    this.interval = setInterval(function () {
      this.getAllEntities(true)
    }.bind(this), 100000)
  },
  mounted () {
    this.$refs.entitiesDataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
