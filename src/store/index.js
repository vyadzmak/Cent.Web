import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistedState from 'vuex-persistedstate'
import * as mutations from './mutations'
import entities from './modules/entities/entities'
import factories from './modules/factories/factories'
import catalogs from './modules/catalogs/catalogs'

Vue.use(Vuex)

const sessionStorage = VuexPersistedState({
  storage: window.sessionStorage
})

const localStorageMutations = ['addRUserData', 'deleteUserData']

const localStorage = VuexPersistedState({
  storage: window.localStorage,
  reducer: state => ({
    userData: state.userData
  }),
  filter: mutation => (localStorageMutations.indexOf(mutation.type) !== -1)
})

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // check if something updates our model not through mutation
  state: {
    userData: null,
    loading: 0,
    snackbarOptions: {snackbar: false},
    updateProperty: null
  },
  // getters
  getters: {
    userData: state => state.userData,
    snackbarOptions: state => state.snackbarOptions,
    updateProperty: state => state.updateProperty,
    loading: state => state.loading
  },
  mutations,
  plugins: [localStorage, sessionStorage],
  modules: {entities, factories, catalogs}
})

export default store
