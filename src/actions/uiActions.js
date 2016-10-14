export function openSearchDialog() {
  return (dispatch, getState) => {
    dispatch({
      type: 'UI_OPEN_SEARCH_DIALOG',
    });
  };
}

export function closeSearchDialog() {
  return (dispatch, getState) => {
    dispatch({
      type: 'UI_CLOSE_SEARCH_DIALOG',    });
  };
}
