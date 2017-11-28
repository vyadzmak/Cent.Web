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
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        fieldIdPrefix: 'prefix-'
      }
    }
  },
  computed: {
    clientTypeItems () {
      return this.$store.state.updateProperty
    },
    schema () {
      return {

        fields: [
          {
            type: 'vtext',
            inputType: 'text',
            label: 'Наименование клиента',
            noLabel: true,
            model: 'name',
            id: 'name',
            required: true,
            rules: [
              (v) => !!v || 'Наименование должно быть заполнено',
              (v) => v && v.length <= 270 || 'Не более 270 символов'
            ]
          },
          {
            type: 'vtext',
            inputType: 'text',
            label: 'Регистрационный номер',
            noLabel: true,
            model: 'registration_number',
            id: 'registration_number',
            required: true,
            rules: [
              (v) => !!v || 'Регистрационный номер должен быть заполнен'
            ]
          },
          {
            type: 'vselect',
            label: 'Тип организации',
            noLabel: true,
            model: 'client_type_id',
            vId: 'id',
            vName: 'name',
            items: this.clientTypeItems, // array of items from db
            required: true,
            rules: [
              (v) => !!v || 'Тип организации должен быть заполнен'
            ]
          },
          {
            type: 'vswitch',
            label: 'Статус',
            noLabel: true,
            model: 'lock_state',
            items: ['активный', 'заблокирован'] // array of items from db
          },
          {
            type: 'vcheckbox',
            label: 'Статус',
            noLabel: true,
            model: 'lock_state',
            value: true
          },
          {
            type: 'vradio',
            label: 'Статус',
            model: 'lock_state',
            items: [{label: 'активный', value: true}, {label: 'заблокирован', value: false}]
          },
          {
            type: 'vcheckbox',
            label: 'John',
            model: 'employees',
            value: {id: 1, name: 'John'}
          },
          {
            type: 'vcheckbox',
            label: 'Mike',
            model: 'employees',
            value: {id: 2, name: 'Mike'}
          },
          {
            type: 'vcheckbox',
            label: 'Sean',
            model: 'employees',
            value: {id: 3, name: 'Sean'}
          },
          {
            type: 'vdatepicker',
            label: 'Дата рождения',
            noLabel: true,
            model: 'bdate'
          }
        ]
      }
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
