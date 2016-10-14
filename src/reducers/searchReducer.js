const initialState = {
  results: {
    results: [],
    request: {
      action: null,
      pending: false,
      error: null
    }
  }
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_SEARCH_S':
      return Object.assign({}, state, {
        results: {
          request: {
            action: 'read',
            pending: true,
            error: null
          }
        }
      })
    case 'SEARCH_SEARCH_R':
      return Object.assign({}, state, {
        results: {
          results: action.results,
          request: {
            action: 'read',
            pending: false,
            error: null
          }
        }
      })
    default:
      return state
  }
}
