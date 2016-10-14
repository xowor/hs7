'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topicsReducer = topicsReducer;
var initialState = {
  topics: {
    topics: [],
    request: {
      action: null,
      pending: false,
      error: null
    }
  },
  topic: {
    topic: null,
    documents: [],
    request: {
      action: null,
      pending: false,
      error: null
    }
  }
};

function topicsReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'TOPICS_READ_S':
      return Object.assign({}, state, {
        topics: {
          topics: [],
          request: {
            action: 'read',
            pending: true,
            error: null
          }
        }
      });
    case 'TOPICS_READ_R':
      return Object.assign({}, state, {
        topics: {
          topics: action.topics,
          request: {
            action: 'read',
            pending: false,
            error: null
          }
        }
      });
    case 'TOPIC_CREATE_S':
      return Object.assign({}, state, {
        topic: {
          request: {
            action: 'create',
            pending: true,
            error: null
          }
        }
      });
    case 'TOPIC_CREATE_R':
      return Object.assign({}, state, {
        topic: {
          topic: action.topic,
          request: {
            action: 'create',
            pending: false,
            error: null
          }
        }
      });
    case 'TOPIC_READ_S':
      return Object.assign({}, state, {
        topic: {
          request: {
            action: 'read',
            pending: true,
            error: null
          }
        }
      });
    case 'TOPIC_READ_R':
      return Object.assign({}, state, {
        topic: {
          topic: action.topic,
          documents: action.documents,
          request: {
            action: 'read',
            pending: false,
            error: null
          }
        }
      });
    // case 'TOPIC_UPDATE':
    //   return Object.assign({}, state, {
    //     topic: {
    //       topic: action.topic,
    //       request: action.request
    //     }
    //   })
    default:
      return state;
  }
}