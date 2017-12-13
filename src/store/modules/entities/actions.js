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
      let objArr = []
      _.forEach(response.data, function (value, key) {
        if (value.schema_type_id !== 3) {
          objArr.push(value)
        }
      })
      commit(types.UPDATE_ENTITY_SCHEMAS, objArr)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit(types.UPDATE_ENTITY_SCHEMAS, [])
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const getCurrentEntity = ({ commit, getters }, {http, id}) => {
  commit('showSpinner', true)
  http.get(`entityDetails` + '/' + id)
    .then(response => {
      let responseData = JSON.parse(response.data)
      responseData.general_section.data = JSON.parse(responseData.general_section.data)
      commit(types.CURRENT_ENTITY, responseData)
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

export const getEntityTable = ({ commit, getters }, {http, item}) => {
  return new Promise((resolve, reject) => {
    http({method: 'post',
      url: 'entityObjects',
      data: item,
      config: { contentType: 'application/json' }
    })
    .then(response => {
      if (response.data) {
        resolve(JSON.parse(response.data))
      } else { reject() }
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      reject()
    })
  })
}
