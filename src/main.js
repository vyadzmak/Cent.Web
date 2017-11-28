// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import VueTransmit from 'vue-transmit'
import VueCharts from 'vue-charts'
import Vue2Filters from 'vue2-filters'
import VueMoment from 'vue-moment'
import VueFormGenerator from 'vue-form-generator'
import YmapPlugin from 'vue-yandex-maps'

import './stylus/main.styl'
import App from './App'
import router from './router'
import store from './store/index'
import http from './httpClient/index'
import { VueModalDialog } from 'vue-modal-dialog'

// form components
import fieldText from './components/formComponents/fieldText/fieldText.vue'
Vue.component('fieldVtext', fieldText)
import fieldSelect from './components/formComponents/fieldSelect/fieldSelect.vue'
Vue.component('fieldVselect', fieldSelect)
import fieldSwitch from './components/formComponents/fieldSwitch/fieldSwitch.vue'
Vue.component('fieldVswitch', fieldSwitch)
import fieldCheckbox from './components/formComponents/fieldCheckbox/fieldCheckbox.vue'
Vue.component('fieldVcheckbox', fieldCheckbox)
import fieldRadio from './components/formComponents/fieldRadio/fieldRadio.vue'
Vue.component('fieldVradio', fieldRadio)
import fieldDatepicker from './components/formComponents/fieldDatepicker/fieldDatepicker.vue'
Vue.component('fieldVdatepicker', fieldDatepicker)

Vue.use(VueFormGenerator)

// create vue plugins to use them in our components without import
Vue.use(Vuetify)
Vue.use(VueLodash, lodash)
Vue.use(VueModalDialog)
Vue.use(VueTransmit)
Vue.use(VueCharts)
Vue.use(Vue2Filters)
Vue.use(VueMoment)
Vue.use(Object.defineProperty(Vue.prototype, '$http', { value: http }))
Vue.config.productionTip = false
Vue.component('vue-form-generator', VueFormGenerator.component)
Vue.use(YmapPlugin)

/* eslint-disable no-new */
window.App = new Vue({
  el: '#app',
  // define our plugins as shorthand objects
  router,
  store,
  http,
  template: '<App/>',
  components: { App }
})