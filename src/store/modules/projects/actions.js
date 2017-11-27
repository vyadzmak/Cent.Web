import types from '../../mutation-types'

export const getAllProjects = ({ commit, getters }, http) => {
  commit('CURRENT_PROJECT_DOCS', [])
  commit('CURRENT_PROJECT_FORM', [])
  return new Promise((resolve, reject) => {
    http.get(`projects`)
    .then(response => {
      let projects = response.data
      commit(types.UPDATE_PROJECTS, projects)
      resolve()
    })
    .catch(e => {
      reject()
    })
  })
}

export const getProjectDocumentsById = ({ commit, getters }, {http, projectId}) => {
  return new Promise((resolve, reject) => {
    http.get(`projectDocuments/` + projectId)
    .then(response => {
      let responseData = response.data ? response.data : null
      if (responseData) {
        commit('CURRENT_PROJECT_DOCS', responseData)
      }
      resolve()
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Загрузка документов проекта не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
      reject()
    })
  })
}

export const getProjectAnalysisById = ({ commit, getters }, {http, projectId}) => {
  commit('showSpinner', true)

  return new Promise((resolve, reject) => {
    commit('SHEETUI_DATA', {})
    http.get(`projectSelectAnalysis/` + projectId)
    .then(response => {
      let responseData = response.data ? JSON.parse(response.data.data) : null
      if (responseData) {
        commit('CURRENT_PROJECT_FORM', responseData.rows)
      }
      commit('showSpinner', false)
      resolve()
    })
    .catch(e => {
      commit('showSpinner', false)
      commit('showSnackbar', {text: 'Загрузка проекта не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
      reject()
    })
  })
}

export const getProjectReportById = ({ commit, getters }, {http, projectId}) => {
  commit('showSpinner', true)
  http.get(`projectReport/` + projectId)
    .then(response => {
      let responseData = response.data ? JSON.parse(response.data.data) : {}
      commit('SHEETUI_DATA', responseData)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSpinner', false)
      commit('showSnackbar', {text: 'Загрузка финанализа не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
    })
}

export const getProjectAnalyticsLog = ({ commit, getters }, {http, projectId}) => {
  commit('showSpinner', true)
  return new Promise((resolve, reject) => {
    http.get(`projectSelectAnalysisLog/` + projectId)
      .then(response => {
        let responseData = response.data ? JSON.parse(response.data.data) : null
        commit('showSpinner', false)
        if (responseData) {
          resolve(responseData.rows)
        }
        reject()
      })
      .catch(e => {
        commit('showSpinner', false)
        commit('showSnackbar', {text: 'Загрузка лога не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
        reject()
      })
  })
}
