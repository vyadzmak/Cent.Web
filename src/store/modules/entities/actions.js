import types from '../../mutation-types'

export const getAllEntities = ({ commit, getters }, http, isSilent) => {
  commit('showSpinner', !isSilent)
  http.get(`entities`)
    .then(response => {
      let entities = response.data
      commit(types.UPDATE_ENTITIES, entities)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}
