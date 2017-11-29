import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      isUpdate: !this.data.item.name,
      valid: false,
      schemaTypes: this.$store.getters.updateProperty &&
        this.$store.getters.updateProperty.length > 0
       ? this.$store.getters.updateProperty : [],
      nameRules: [
        (v) => !!v || 'Поле должно быть заполнено',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ]
    }
  },
  computed: {
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        ModalService.submit(this.data.item) // resolve .open() promise
      }
    },
    cancel: function () {
      ModalService.cancel(this.data.item) // reject .open() promise
    },
    clear: function () {
      this.$refs.form.reset()
    }
  }
}
