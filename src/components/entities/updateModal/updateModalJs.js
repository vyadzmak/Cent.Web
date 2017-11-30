import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    let mData = JSON.parse(this.$store.getters.entitySchema.data)
    return {
      isUpdate: !this.data.item.name,
      valid: false,
      sNameRules: [
        (v) => !!v || 'Наименование проекта должно быть заполнено',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ],

      updateItem: {fields: _.cloneDeep(mData.fields)},
      formSchema: {}
    }
  },
  computed: {
    updEntitySchema () {
      return this.$store.getters.entitySchema
    }
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
    },
    generateSchema () {
      let vm = this
      this.formSchema.fields = []
      _.forEach(this.updateItem.fields, function (value, key) {
        vm.formSchema.fields.push(vm.generateField(value, key))
      })
    },
    generateField (value, key) {
      let field = {
        type: this.getFieldType(value.field_type),
        label: value.title,
        model: 'fields[' + key + '].value',
        noLabel: true
      }

      return field
    },
    getFieldType (fieldType) {
      let type = 'input'
      switch (fieldType) {
        case 1: type = 'input'
          break
      }
      return type
    }
  },
  created () {
    this.generateSchema()
  }
}
