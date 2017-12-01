let types = {
  // root mutations
  addUserData: 'addUserData', // adding to session storage
  addRUserData: 'addRUserData', // adding to local and session storage
  deleteUserData: 'deleteUserData', // deleting from local and session storage
  showSpinner: 'showSpinner',
  showSnackbar: 'showSnackbar',
  setUpdateProperty: 'setUpdateProperty',

  // ENTITY and currentENTITY mutations
  UPDATE_ENTITIES: 'UPDATE_ENTITIES',
  ADD_ENTITY: 'ADD_ENTITY',
  UPDATE_ENTITY: 'UPDATE_ENTITY',
  DELETE_ENTITY: 'DELETE_ENTITY',
  CURRENT_ENTITY: 'CURRENT_ENTITY',
  UPDATE_ENTITY_SCHEMAS: 'UPDATE_ENTITY_SCHEMAS',
  UPDATE_ENTITY_SCHEMA: 'UPDATE_ENTITY_SCHEMA',
  UPDATE_UPDATE_ENTITY: 'UPDATE_UPDATE_ENTITY',

  // FACTORY and currentFACTORY mutations
  UPDATE_FACTORIES: 'UPDATE_FACTORIES',
  ADD_FACTORY: 'ADD_FACTORY',
  UPDATE_FACTORY: 'UPDATE_FACTORY',
  DELETE_FACTORY: 'DELETE_FACTORY',
  CURRENT_FACTORY: 'CURRENT_FACTORY'
}

export default types

