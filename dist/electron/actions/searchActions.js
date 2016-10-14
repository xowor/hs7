'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = search;
function search(query) {
  return function (dispatch) {
    dispatch({
      type: 'SEARCH_SEARCH_S',
      query: query
    });
  };
}