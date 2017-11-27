import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  projects: [],
  currentDocuments: [],
  currentProject: {},
  currentProjectForm: []
}

// getters
const getters = {
  projects: state => state.projects,
  currentDocuments: state => state.currentDocuments,
  currentProject: state => state.currentProject,
  currentProjectForm: state => state.currentProjectForm
}
export default {
  state,
  getters,
  actions,
  mutations
}
