import { abstractField } from 'vue-form-generator'

export default {
  inject: ['$validator'],
  mixins: [ abstractField ]
}
