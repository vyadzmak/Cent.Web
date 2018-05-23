import questionDialog from '../questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'catalogs',
  data () {
    return {
      msg: 'Каталоги',
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
          message: 'Вы действительно хотите удалить каталог?',
          title: 'Удаление каталога',
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
        vum.$store.dispatch('getCatalogSchema', {http: vum.$http, id: vum.currentSchema.id})
          .then(response => {
            if (isUpdate) {
              vum.$store.dispatch('getUpdateCatalog', {http: vum.$http, id: item.g_id})
                .then(response => {
                  updateItem = _.cloneDeep(vum.$store.getters.updateCatalog)
                  updateItem.fields = updateItem.data.fields
                  updateItem.data = undefined
                  updateItem.parent_id = -1
                  let modalConfig = {
                    size: 'lg',
                    data: {
                      title: (isUpdate ? 'Обновление' : 'Добавление') + ' каталога',
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
                  title: (isUpdate ? 'Обновление' : 'Добавление') + ' каталога',
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
          this.getCatalogs()
          this.$store.commit('showSnackbar', {text: 'Удаление каталога прошло успешно', snackbar: true, context: 'success'})
          this.$store.commit('showSpinner', false)
        })
        .catch(e => {
          this.errors.push(e)
          this.$store.commit('showSpinner', false)
          this.$store.commit('showSnackbar', {text: 'Удаление каталога не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        })
    },
    updateItem: function (item, isUpdate) {
      this.$store.dispatch('updateCatalog', {isUpdate: isUpdate, item: item})
        .then(response => this.getCatalogs())
    },
    getCatalogs () {
      this.$store.dispatch('getAllCatalogs', {id: this.currentSchema.id})
    },
    getCatalogSchemas () {
      this.$store.dispatch('getCatalogSchemas', {id: this.userData.client_id})
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    },
    catalogs: function () {
      return this.$store.getters.catalogs && this.$store.getters.catalogs.headers ? this.$store.getters.catalogs : {headers: [], items: []}
    },
    catalogSchemas: function () {
      return this.$store.getters.catalogSchemas
    },
    headers () {
      return this.catalogs.headers.concat([{sortable: false}, {sortable: false}])
    }
  },
  watch: {
    catalogSchemas: function (newValue) {
      this.currentSchema = newValue[0]
    },
    currentSchema: function (newValue) {
      this.getCatalogs()
    }
  },
  created () {
    this.getCatalogSchemas()
  },
  mounted () {
    this.$refs.catalogsDataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
    this.$store.commit('UPDATE_CATALOGS', {})
  }
}
