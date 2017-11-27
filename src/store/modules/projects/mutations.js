import types from '../../mutation-types'

const mutations = {
  [types.UPDATE_PROJECTS] (state, projects) {
    state.projects = projects
  },

  [types.ADD_PROJECT] (state, project) {
    state.projects.push(project)
  },

  [types.UPDATE_PROJECT] (state, {project, index}) {
    state.projects[index] = project
  },

  [types.DELETE_PROJECT] (state, index) {
    state.projects.splice(index, 1)
  },

  [types.CURRENT_PROJECT] (state, currentProject) {
    state.currentProject = currentProject
  },

  [types.CURRENT_PROJECT_DOCS] (state, documents) {
    state.currentDocuments = documents
  },

  [types.CURRENT_PROJECT_FORM] (state, payload) {
    state.currentProjectForm = payload
  },

  [types.CURRENT_PROJECT_FIELD] (state, {field, value}) {
    Object.assign(state.currentProject, {
      [field]: value
    })
  }
}

export default mutations
