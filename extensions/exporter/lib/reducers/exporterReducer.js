const initialState = {
  exporter: {
  }
}

export const exporterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EXT_EXPORTER_TEST_R':
      return Object.assign({}, state)
    default:
      return state
  }
}
