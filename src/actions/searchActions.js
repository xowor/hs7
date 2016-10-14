export function search(query) {
  return (dispatch) => {
    dispatch({
      type: 'SEARCH_SEARCH_S',
      query
    })
  }
}
