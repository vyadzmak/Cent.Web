import types from '../../mutation-types'

export const getAllCatalogs = ({ commit, getters }, {http, id}) => {
  commit('showSpinner', true)
  http.get('schemaObjects' + '/' + id)
    .then(response => {
      let responseData = JSON.parse(response.data)
      commit(types.UPDATE_CATALOGS, responseData)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const getCatalogSchemas = ({ commit, getters }, {http, id}) => {
  commit('showSpinner', true)
  http.get(`schemaCatalogs` + '/' + id)
    .then(response => {
      let catalogs = []
      _.forEach(response.data, function (value, key) {
        if (value.schema_type_id === 3) {
          catalogs.push(value)
        }
      })
      commit(types.UPDATE_CATALOG_SCHEMAS, catalogs)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const getCatalogSchema = ({ commit, getters }, {http, id}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http.get(`schema` + '/' + id)
    .then(response => {
      commit(types.UPDATE_CATALOG_SCHEMA, response.data)
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

export const getUpdateCatalog = ({ commit, getters }, {http, id}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http.get(`object` + '/' + id)
    .then(response => {
      let responseData = response.data
      responseData.data = JSON.parse(responseData.data)
      commit(types.UPDATE_UPDATE_CATALOG, responseData)
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

export const updateCatalog = ({ commit, getters }, {http, isUpdate, item}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http({method: isUpdate ? 'put' : 'post',
      url: isUpdate ? 'object/' + item.id : 'objects',
      data: item,
      config: { contentType: 'application/json' }
    })
.then(response => {
  let responseData = response.data && response.data !== 'Error' ? response.data : null
  commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' каталога прошло успешно', snackbar: true, context: 'success'})
  commit('showSpinner', false)
  resolve(responseData)
})
    .catch(e => {
      commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' каталога не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
      reject()
    })
  })
}
