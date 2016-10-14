'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagsReducer = tagsReducer;
var initialState = {
  tags: {
    tags: [],
    request: {
      action: null,
      pending: false,
      error: null
    }
  },
  tag: {
    tag: null,
    documents: [],
    request: {
      action: null,
      pending: false,
      error: null
    }
  }
};

function tagsReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'TAGS_READ_S':
      return Object.assign({}, state, {
        tags: {
          tags: [],
          request: {
            action: 'read',
            pending: true,
            error: null
          }
        }
      });
    case 'TAGS_READ_R':
      return Object.assign({}, state, {
        tags: {
          tags: action.tags,
          request: {
            action: 'read',
            pending: false,
            error: null
          }
        }
      });
    case 'TAG_CREATE_S':
      return Object.assign({}, state, {
        tag: {
          request: {
            action: 'create',
            pending: true,
            error: null
          }
        }
      });
    case 'TAG_CREATE_R':
      return Object.assign({}, state, {
        tag: {
          tag: action.tag,
          request: {
            action: 'create',
            pending: false,
            error: null
          }
        }
      });
    case 'TAG_READ_S':
      return Object.assign({}, state, {
        tag: {
          request: {
            action: 'read',
            pending: true,
            error: null
          }
        }
      });
    case 'TAG_READ_R':
      return Object.assign({}, state, {
        tag: {
          tag: action.tag,
          documents: action.documents,
          request: {
            action: 'read',
            pending: false,
            error: null
          }
        }
      });
    // case 'TAG_UPDATE':
    //   return Object.assign({}, state, {
    //     tag: {
    //       tag: action.tag,
    //       request: action.request
    //     }
    //   })
    default:
      return state;
  }
}