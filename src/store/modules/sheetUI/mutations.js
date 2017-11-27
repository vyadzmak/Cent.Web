import types from '../../mutation-types'

const mutations = {
  [types.CELL_DETAILS] (state, payload) {
    state.cellDetails = payload
  },
  [types.CURRENT_CELL] (state, payload) {
    state.currentCell = payload
  },
  [types.SHEETUI_DATA] (state, payload) {
    state.sheetUIData = payload
  }
}

export default mutations
