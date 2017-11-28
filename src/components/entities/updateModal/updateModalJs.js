import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      menu: false,
      totalProgress: 0,
      filesCount: 0,
      showProgress: false,
      updateItem: _.cloneDeep(this.$store.getters.currentEntity),
      sNameRules: [
        (v) => !!v || 'Наименование проекта должно быть заполнено',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ],
      options: {
        acceptedFileTypes: ['.xlsx', '.xls'],
        url: 'http://127.0.0.1:5000/upload;',
        clickable: false,
        autoProcessQueue: false,
        maxConcurrentUploads: 300,
        uploadMultiple: true,
        maxFiles: 300
      }
    }
  },
  computed: {
  },
  methods: {
    submit: function () {
      this.$store.commit('showSpinner', false)
      ModalService.submit(this.updateItem)
    },
    cancel: function () {
      this.$store.commit('showSpinner', false)
      ModalService.cancel(this.updateItem) // reject .open() promise
    },
    uploadFiles (file) {
      this.$refs.uploader.processQueue()
    },
    triggerBrowse () {
      this.$refs.uploader.triggerBrowseFiles()
    },
    removeFile (file) {
      this.$refs.uploader.removeFile(file)
    },
    beforeSend (files, xhrRequest, formData) {
      xhrRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhrRequest.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin')
      this.filesCount = 0
      this.showProgress = true
      this.$store.commit('showSpinner', true)
      formData.append('userId', this.$store.getters.userData.id)
    },
    completeSend (files) {
      let x = 0
      files.forEach(function (element) {
        if (element.xhr.status === 200 && element.accepted) {
          x += 1
        }
      }, this)
      let text = x === files.length ? 'Загрузка файлов успешно завершена'
        : x === 0 ? 'Загрузка файлов не удалась. Обратитесь к администратору'
        : 'Загружено ' + x + ' из ' + files.length + '!'
      let context = x === files.length ? 'success'
        : x === 0 ? 'error'
        : 'warning'
      this.$store.commit('showSnackbar', {text, snackbar: true, context})
      this.submit()
    },
    totalProgressChanged (file) {
      this.totalProgress = file.totalProgress
    },
    filesAcceptedFunction (file) {
      this.filesCount += 1
    },
    fileRemovedFunction (file) {
      if (file.accepted) {
        this.filesCount -= 1
      }
    }
  }
}
