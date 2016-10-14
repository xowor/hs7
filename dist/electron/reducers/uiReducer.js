'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiReducer = uiReducer;
var initialState = {
  searchDialog: {
    open: false
  }
};

function uiReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'UI_OPEN_SEARCH_DIALOG':
      return Object.assign({}, state, {
        searchDialog: {
          open: true
        }
      });
    case 'UI_CLOSE_SEARCH_DIALOG':
      return Object.assign({}, state, {
        searchDialog: {
          open: false
        }
      });
    default:
      return state;
  }
}