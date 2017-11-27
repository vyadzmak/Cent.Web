import questionDialog from '../questionDialog/questionDialog'
// import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'project',
  data () {
    return {
      msg: 'Проект',
      search: '',
      errors: [],
      activeTab: null,
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
    project () {
      return this.$store.getters.currentProject
    },
    documents () {
      return this.$store.getters.currentDocuments
    },
    projectForm () {
      return this.$store.getters.currentProjectForm
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
      this.$http.delete('userprojects', {params: {id: itemId}})
      .then(response => {
        if (response.data && response.data !== 'Error') {
          this.projects.splice(this.projects.findIndex((element, index, array) => {
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
      this.$router.push({name: 'FinAnalysis', params: {id: this.project.id}})
    }
  },
  watch: {
    projectForm: function (val) {
    }
  },
  created () {
    this.$store.dispatch('getProjectAnalysisById', {http: this.$http, projectId: this.$route.params.id}).then(() => {
      this.$store.dispatch('getProjectDocumentsById', {http: this.$http, projectId: this.$route.params.id})
    })
  },
  mounted () {
    this.$refs.projectDataTable.defaultPagination.descending = true
  }
}
