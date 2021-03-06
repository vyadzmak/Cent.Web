import questionDialog from '../../questionDialog/QuestionDialog.vue'
import { ModalService } from 'vue-modal-dialog'
import {mapGetters} from 'vuex'

export default {
  name: 'log',
  data () {
    return {
      msg: 'Лог',
      search: '',
      errors: [],
      headers: [
        { text: 'ID', align: 'left', value: 'id' },
        { text: 'Дата', align: 'left', value: 'date' },
        { text: 'Сообщение', align: 'left', value: 'message' }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов'
    }
  },
  computed: {
    ...mapGetters({
      logs: 'logs/items'
    })
  },
  methods: {
    showDeleteModal: function () {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите очистить лог?',
          title: 'Очитска лога',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => { this.deleteItems() },
        modalCancel => {}
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    deleteItems: function () {
      this.$store.commit('showSpinner', true)
      this.$http.delete('log', {params: {id: -1}})
        .then(response => {
          if (response.status === 204) {
            this.logs.splice(0, this.logs.length)
            this.$store.commit('showSnackbar', {text: 'Очистка лога прошла успешно', snackbar: true, context: 'success'})
          } else {
            this.$store.commit('showSnackbar', {text: 'Очистка лога не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
          }
          this.$store.commit('showSpinner', false)
        })
        .catch(e => {
          this.errors.push(e)
          this.$store.commit('showSpinner', false)
          this.$store.commit('showSnackbar', {text: 'Очистка лога не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
        })
    }
  },
  created () {
    this.$store.dispatch('logs/getItems')
  },
  mounted () {
    this.$refs.logDataTable.defaultPagination.descending = true
  }
}
