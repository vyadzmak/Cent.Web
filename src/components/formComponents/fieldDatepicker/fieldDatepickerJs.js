import { abstractField } from 'vue-form-generator'

export default {
  data: () => ({
    menu: false,
    modal: false
  }),
  methods: {
    save () {}
  },
  mixins: [ abstractField ]
}
