'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openSearchDialog = openSearchDialog;
exports.closeSearchDialog = closeSearchDialog;
function openSearchDialog() {
  return function (dispatch, getState) {
    dispatch({
      type: 'UI_OPEN_SEARCH_DIALOG'
    });
  };
}

function closeSearchDialog() {
  return function (dispatch, getState) {
    dispatch({
      type: 'UI_CLOSE_SEARCH_DIALOG' });
  };
}