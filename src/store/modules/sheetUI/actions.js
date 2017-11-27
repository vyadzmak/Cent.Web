export const getTableDialog = ({ commit, getters }, {http, link, params}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    let param = {params: {}}
    if (params) {
      param.params.userId = params.user_id
    }
    http.get(link, param)
    .then(response => {
      let responseData = response.data ? JSON.parse(response.data.data) : null
      commit('showSpinner', false)
      if (responseData) {
        resolve(responseData.rows)
      }
      reject()
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Загрузка проекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
      reject()
    })
  })
}

export const getSheetUITableDialog = ({ commit, getters }, {http, link, cell}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http({method: 'post',
      url: link,
      data: cell,
      config: { contentType: 'application/json' }
    })
    .then(response => {
      let responseData = response.data ? JSON.parse(response.data) : null
      commit('showSpinner', false)
      if (responseData) {
        resolve(responseData.rows)
      }
      reject()
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
      reject()
    })
  })
}
