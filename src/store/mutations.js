export const showSpinner = (state, payload) => {
  state.loading = payload ? 1 : 0
}

export const showSnackbar = (state, payload) => {
  state.snackbarOptions.context = payload.context ? payload.context : 'info'
  state.snackbarOptions.mode = payload.mode ? payload.mode : 'vertical'
  state.snackbarOptions.text = payload.text ? payload.text : 'Hello'
  state.snackbarOptions.timeout = payload.timeout ? payload.timeout : 4000
  state.snackbarOptions.xlay = payload.xlay ? payload.xlay : 'right'
  state.snackbarOptions.ylay = payload.ylay ? payload.ylay : 'top'
  state.snackbarOptions.snackbar = payload.snackbar ? payload.snackbar : false
}

export const setUpdateProperty = (state, payload) => {
  state.updateProperty = payload
}

export const updateByPath = (state, {path, value}) => {
  _.set(state, path, value)
}

export const addElementToArray = (state, {path, value}) => {
  let arr = _.get(state, path)
  arr.push(value)
}
