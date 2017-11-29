import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  entities: [],
  currentEntity: {},
  entitySchemas: []
}

// getters
const getters = {
  entities: state => state.entities,
  entitySchemas: state => state.entitySchemas,
  currentEntity: state => state.currentEntity
}
export default {
  state,
  getters,
  actions,
  mutations
}
