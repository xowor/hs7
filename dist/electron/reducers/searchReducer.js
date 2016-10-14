'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialState = {
  results: {
    results: [],
    request: {
      action: null,
      pending: false,
      error: null
    }
  }
};

var searchReducer = exports.searchReducer = function searchReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

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
      });
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
      });
    default:
      return state;
  }
};