const initialState = {
  searchDialog: {
    open: false,
  }
}

export function uiReducer (state = initialState, action) {
  switch (action.type) {
    case 'UI_OPEN_SEARCH_DIALOG':
      return Object.assign({}, state, {
        searchDialog: {
          open: true
        }
      })
    case 'UI_CLOSE_SEARCH_DIALOG':
      return Object.assign({}, state, {
        searchDialog: {
          open: false
        }
      })
    default:
      return state
  }
}
