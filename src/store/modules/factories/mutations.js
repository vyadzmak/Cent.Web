import types from '../../mutation-types'

const mutations = {
  [types.UPDATE_FACTORIES] (state, factories) {
    state.factories = factories
  },

  [types.ADD_FACTORY] (state, factory) {
    state.factories.push(factory)
  },

  [types.UPDATE_FACTORY] (state, factory) {
    let index = _.findIndex(state.factories, ['id', factory.id])
    state.factories[index] = factory
  },

  [types.DELETE_FACTORY] (state, index) {
    state.factories.splice(index, 1)
  },

  [types.CURRENT_FACTORY] (state, currentFactory) {
    state.currentFactory = currentFactory
  }
}

export default mutations
