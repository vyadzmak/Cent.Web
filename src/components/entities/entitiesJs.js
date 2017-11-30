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
      noResultsText: 'Поиск не дал результатов',

      currentSchema: null

    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    },
    entities () {
      return this.$store.getters.entities
    },
    entitySchemas: {
      get: function () { return this.$store.getters.entitySchemas },
      set: function (newValue) {
        if (newValue.length > 0) {
          this.currentSchema = newValue[0]
        }
      }
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
      if (item) {
        isUpdate = true
      } else {
        item = {schema_type_id: null}
      }

      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта',
          isClosable: true,
          item: isUpdate ? _.cloneDeep(item) : item
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
      this.$store.dispatch('getAllEntities', {http: this.$http, isSilent: isSilent})
    },
    getEntitySchemas () {
      this.$store.dispatch('getEntitySchemas', {http: this.$http, id: this.userData.client_id})
    }
  },
  created () {
    this.getEntitySchemas()
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
