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

import './stylus/main.styl'
import App from './App'
import router from './router'
import store from './store/index'
import http from './httpClient/index'
import {FormSchema} from './init/formSchema'
import { VueModalDialog } from 'vue-modal-dialog'

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
Vue.component('formSchema', FormSchema)

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
