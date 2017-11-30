import types from '../../mutation-types'

export const getAllEntities = ({ commit, getters }, {http, isSilent}) => {
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

export const getEntitySchemas = ({ commit, getters }, {http, id}) => {
  commit('showSpinner', true)
  http.get(`schemaClients` + '/' + id)
    .then(response => {
      commit(types.UPDATE_ENTITY_SCHEMAS, response.data)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const getEntitySchema = ({ commit, getters }, {http, id}) => {
  commit('showSpinner', true)
  http.get(`schema` + '/' + id)
    .then(response => {
      commit(types.UPDATE_ENTITY_SCHEMA, response.data)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const updateEntity = ({ commit, getters }, {http, isUpdate, item}) => {
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify(item))
    commit('showSpinner', true)
    http({method: isUpdate ? 'put' : 'post',
      url: isUpdate ? 'object/' + item.id : 'objects',
      data: item,
      config: { contentType: 'application/json' }
    })
.then(response => {
  let responseData = response.data && response.data !== 'Error' ? response.data : null
  if (responseData) {
    if (isUpdate) {
      commit('UPDATE_ENTITY', responseData)
    } else {
      commit('ADD_ENTITY', responseData)
    }
    commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта прошло успешно', snackbar: true, context: 'success'})
  } else {
    commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта не удалось', snackbar: true, context: 'error'})
  }
  commit('showSpinner', false)
  resolve(responseData)
})
    .catch(e => {
      commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
      reject()
    })
  })
}
