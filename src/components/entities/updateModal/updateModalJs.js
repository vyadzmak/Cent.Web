import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      isUpdate: !this.data.item.name,
      valid: false,
      sNameRules: [
        (v) => !!v || 'Наименование проекта должно быть заполнено',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ]
    }
  },
  computed: {
  },
  methods: {
    submit: function () {
      ModalService.submit(this.updateItem)
    },
    cancel: function () {
      this.$store.commit('showSpinner', false)
      ModalService.cancel(this.updateItem) // reject .open() promise
    },
    clear: function () {
      this.$refs.form.reset()
    }
  }
}
