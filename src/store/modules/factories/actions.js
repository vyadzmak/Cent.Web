import types from '../../mutation-types'

export const getAllFactories = ({ commit, getters }, http) => {
  commit('showSpinner', true)
  http.get(`schemas`)
    .then(response => {
      let factories = response.data
      commit(types.UPDATE_FACTORIES, factories)
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const updateFactory = ({ commit, getters }, http, isUpdate, item) => {
  commit('showSpinner', true)
  http({method: isUpdate ? 'put' : 'post',
    url: isUpdate ? 'schema/' + item.id : 'schemas',
    data: item,
    config: { contentType: 'application/json' }
  })
.then(response => {
  let responseData = response.data && response.data !== 'Error' ? response.data : null
  if (responseData) {
    if (isUpdate) {
      commit('UPDATE_FACTORY', responseData)
    } else {
      commit('ADD_FACTORY', responseData)
    }
    this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' конструктора прошло успешно', snackbar: true, context: 'success'})
  } else {
    this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' конструктора не удалось', snackbar: true, context: 'error'})
  }
  commit('showSpinner', false)
})
    .catch(e => {
      commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' конструктора не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}
