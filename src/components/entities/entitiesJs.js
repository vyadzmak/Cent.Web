import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'entities',
  data () {
    return {
      msg: 'объекты',
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
          message: 'Вы действительно хотите удалить объект?',
          title: 'Удаление объекта',
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
      let vum = this
      let isUpdate = false
      let updateItem = {}
      if (item) {
        isUpdate = true
      } else {
        updateItem = {schema_id: this.currentSchema.id,
          client_id: this.userData.client_id,
          user_id: this.userData.id,
          parent_id: -1}
      }

      if (this.currentSchema.id) {
        vum.$store.dispatch('getEntitySchema', {http: vum.$http, id: vum.currentSchema.id})
      .then(response => {
        if (isUpdate) {
          vum.$store.dispatch('getUpdateEntity', {http: vum.$http, id: item.g_id})
          .then(response => {
            updateItem = _.cloneDeep(vum.$store.getters.updateEntity)
            updateItem.fields = updateItem.data.fields
            updateItem.data = undefined
            updateItem.parent_id = -1
            let modalConfig = {
              size: 'lg',
              data: {
                title: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта',
                isClosable: true,
                item: updateItem
              }
            }
            ModalService.open(updateModal, modalConfig)
            .then(modalSubmit => { vum.updateItem(modalSubmit, isUpdate) }, modalCancel => { console.log(modalCancel) })
            .catch(err => { console.log(err) })
          })
        } else {
          let modalConfig = {
            size: 'lg',
            data: {
              title: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта',
              isClosable: true,
              item: updateItem
            }
          }
          ModalService.open(updateModal, modalConfig)
          .then(modalSubmit => { vum.updateItem(modalSubmit, isUpdate) }, modalCancel => { console.log(modalCancel) })
          .catch(err => { console.log(err) })
        }
      })
      }
    },
    deleteItem: function (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('object/' + itemId)
      .then(response => {
        this.getEntities()
        this.$store.commit('showSnackbar', {text: 'Удаление объекта прошло успешно', snackbar: true, context: 'success'})
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: 'Удаление объекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    },
    updateItem: function (item, isUpdate) {
      this.$store.dispatch('updateEntity', {http: this.$http, isUpdate: isUpdate, item: item})
      .then(response => this.getEntities())
    },
    goToEntity (itemId) {
      this.$router.push({name: 'Entity', params: {id: itemId}})
    },
    getEntities () {
      if (this.currentSchema && this.currentSchema.id) {
        this.$store.dispatch('getAllEntities', {http: this.$http, id: this.currentSchema.id})
      }
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
    this.$store.commit('UPDATE_ENTITIES', {})
  }
}
