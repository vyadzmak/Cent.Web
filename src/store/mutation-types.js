let types = {
  // root mutations
  addUserData: 'addUserData', // adding to session storage
  addRUserData: 'addRUserData', // adding to local and session storage
  deleteUserData: 'deleteUserData', // deleting from local and session storage
  showSpinner: 'showSpinner',
  showSnackbar: 'showSnackbar',
  setUpdateProperty: 'setUpdateProperty',

  // project and currentProject mutations
  UPDATE_PROJECTS: 'UPDATE_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  CURRENT_PROJECT: 'CURRENT_PROJECT',
  CURRENT_PROJECT_DOCS: 'CURRENT_PROJECT_DOCS',
  CURRENT_PROJECT_FORM: 'CURRENT_PROJECT_FORM',
  CURRENT_PROJECT_FIELD: 'CURRENT_PROJECT_FIELD',

  // sheetUI
  CELL_DETAILS: 'CELL_DETAILS',
  CURRENT_CELL: 'CURRENT_CELL',
  SHEETUI_DATA: 'SHEETUI_DATA'
}

export default types

