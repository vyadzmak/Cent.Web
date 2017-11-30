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
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      currentSchema: null
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
        item = {}
      }

      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта',
          isClosable: true,
          item: isUpdate ? _.cloneDeep(item) : item
        }
      }
      if (this.currentSchema.id) {
        this.$store.dispatch('getEntitySchema', {http: this.$http, id: this.currentSchema.id})
      .then(response => {
        ModalService.open(updateModal, modalConfig).then(
          modalSubmit => {
            modalSubmit.schema_id = this.currentSchema.id
            modalSubmit.client_id = this.userData.client_id
            modalSubmit.user_id = this.userData.id
            modalSubmit.parent_id = -1
            this.updateItem(modalSubmit, isUpdate)
          },
          modalCancel => { console.log(modalCancel) }
      ).catch(err => { console.log(err) })
      })
      }
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
      this.$store.dispatch('updateEntity', {http: this.$http, isUpdate: isUpdate, item: item})
      .then(response => this.getEntities())
    },
    goToEntity (item) {
      this.$store.commit('CURRENT_ENTITY', item)
      this.$router.push({name: 'Entity', params: {id: item.id}})
    },
    getEntities () {
      this.$store.dispatch('getAllEntities', {http: this.$http, id: this.currentSchema.id})
    },
    getEntitySchemas () {
      this.$store.dispatch('getEntitySchemas', {http: this.$http, id: this.userData.client_id})
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    },
    entities: function () {
      return this.$store.getters.entities && this.$store.getters.entities.headers ? this.$store.getters.entities : {headers: [], items: []}
    },
    entitySchemas: function () {
      return this.$store.getters.entitySchemas
    }
  },
  watch: {
    entitySchemas: function (newValue) {
      this.currentSchema = newValue[0]
    },
    currentSchema: function (newValue) {
      this.getEntities()
    }
  },
  created () {
    this.getEntitySchemas()
  },
  mounted () {
    this.$refs.entitiesDataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
  }
}
