import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  entities: [],
  currentEntity: {}
}

// getters
const getters = {
  entities: state => state.entities,
  currentEntity: state => state.currentEntity
}
export default {
  state,
  getters,
  actions,
  mutations
}
