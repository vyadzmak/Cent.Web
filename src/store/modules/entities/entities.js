import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  entities: [],
  currentEntity: {},
  entitySchemas: [],
  entitySchema: {}
}

// getters
const getters = {
  entities: state => state.entities,
  entitySchemas: state => state.entitySchemas,
  entitySchema: state => state.entitySchema,
  currentEntity: state => state.currentEntity
}
export default {
  state,
  getters,
  actions,
  mutations
}
