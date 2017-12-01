import types from '../../mutation-types'

const mutations = {
  [types.UPDATE_ENTITIES] (state, entities) {
    state.entities = entities
  },

  [types.ADD_ENTITY] (state, entity) {
    state.entities.push(entity)
  },

  [types.UPDATE_ENTITY] (state, {entity, index}) {
    state.entities[index] = entity
  },

  [types.UPDATE_ENTITY_SCHEMAS] (state, payload) {
    state.entitySchemas = payload
  },

  [types.UPDATE_ENTITY_SCHEMA] (state, payload) {
    state.entitySchema = payload
  },

  [types.DELETE_ENTITY] (state, index) {
    state.entities.splice(index, 1)
  },

  [types.UPDATE_UPDATE_ENTITY] (state, payload) {
    state.updateEntity = payload
  },

  [types.CURRENT_ENTITY] (state, currentEntity) {
    state.currentEntity = currentEntity
  }
}

export default mutations
