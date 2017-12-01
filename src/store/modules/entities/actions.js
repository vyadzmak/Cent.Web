import types from '../../mutation-types'

export const getAllEntities = ({ commit, getters }, {http, id}) => {
  commit('showSpinner', true)
  http.get('schemaObjects' + '/' + id)
    .then(response => {
      let entities = JSON.parse(response.data)
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
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http.get(`schema` + '/' + id)
    .then(response => {
      commit(types.UPDATE_ENTITY_SCHEMA, response.data)
      commit('showSpinner', false)
      resolve()
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
      reject()
    })
  })
}

export const getUpdateEntity = ({ commit, getters }, {http, id}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http.get(`object` + '/' + id)
    .then(response => {
      let responseData = response.data
      responseData.data = JSON.parse(responseData.data)
      commit(types.UPDATE_UPDATE_ENTITY, responseData)
      commit('showSpinner', false)
      resolve()
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
      reject()
    })
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
  commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта прошло успешно', snackbar: true, context: 'success'})
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
