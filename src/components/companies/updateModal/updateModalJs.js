import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || 'Наименование должно быть заполнено',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ],
      addressRules: [
        (v) => !!v || 'Адрес должен быть заполнен',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ],
      regRules: [
        (v) => !!v || 'Регистрационный номер должен быть заполнен'
      ],
      schema: {
        '$schema': 'http://json-schema.org/draft-04/schema#',
        'type': 'object',
        'title': 'Newsletter Subscription',
        'properties': {
          'name': {
            'type': 'string',
            'minLength': 8,
            'maxLength': 80,
            'attrs': {
              'placeholder': 'Full Name',
              'title': 'Please enter your full name'
            }
          },
          'registration_number': {
            'type': 'string',
            'maxLength': 80,
            'attrs': {
              'placeholder': 'Full Name',
              'title': 'Регистрационный номер'
            }
          },
          'lists': {
            'type': 'string',
            'enum': ['Daily New', 'Promotion']
          }
        },
        'additionalProperties': false,
        'required': ['name', 'email', 'lists']
      }
    }
  },
  computed: {
    clientTypeItems () {
      return this.$store.state.updateProperty
    }
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
