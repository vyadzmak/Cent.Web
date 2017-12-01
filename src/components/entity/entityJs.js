import questionDialog from '../questionDialog/questionDialog'
// import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'entity',
  data () {
    return {
      msg: 'Детали' + (this.entity ? this.entity.title : ''),
      search: '',
      errors: [],
      activeTab: null,
      tabs: [{id: 'tab-1', name: 'Общая информация'}, {id: 'tab-2', name: 'Объекты'}, {id: 'tab-3', name: 'Документы'}, {id: 'tab-4', name: 'История'}, {id: 'tab-5', name: 'Связи'}],
      headers: [
        { text: 'ID', align: 'left', value: 'id' },
        { text: 'Имя файла', align: 'left', value: 'file_name' },
        { text: 'Размер, MB', align: 'left', value: 'file_size' },
        { text: 'Время загрузки', align: 'left', value: 'created_date' },
        { text: 'Пользователь', align: 'left', value: 'user_data.last_name' },
        { text: 'Состояние', align: 'left', value: 'document_state.name' }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов'
    }
  },
  computed: {
    userData () {
      return this.$store.state.userData
    },
    entity () {
      return this.$store.getters.currentEntity
    },
    documents () {
      return this.$store.getters.currentDocuments
    },
    entityForm () {
      return this.$store.getters.currentEntityForm
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
    deleteItem (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('userentities', {params: {id: itemId}})
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
    goToFinAnalysis () {
      this.$router.push({name: 'FinAnalysis', params: {id: this.entity.id}})
    },
    getEntities () {
      this.$store.dispatch('getAllEntities', {http: this.$http, id: this.currentSchema.id})
    }
  },
  created () {

  },
  mounted () {
    this.$refs.entityDataTable.defaultPagination.descending = true
  }
}
