import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  cellDetails: {},
  currentCell: {},
  sheetUIData: {}
}

// getters
const getters = {
  cellDetails: state => state.cellDetails,
  currentCell: state => state.currentCell,
  sheetUIData: state => state.sheetUIData
}
export default {
  state,
  getters,
  actions,
  mutations
}
