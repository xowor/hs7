const initialState = {
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
}

export function topicsReducer(state = initialState, action) {
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
      })
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
      })
    case 'TOPIC_CREATE_S':
      return Object.assign({}, state, {
        topic: {
          request: {
            action: 'create',
            pending: true,
            error: null
          }
        }
      })
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
      })
    case 'TOPIC_READ_S':
      return Object.assign({}, state, {
        topic: {
          request: {
            action: 'read',
            pending: true,
            error: null
          }
        }
      })
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
      })
    // case 'TOPIC_UPDATE':
    //   return Object.assign({}, state, {
    //     topic: {
    //       topic: action.topic,
    //       request: action.request
    //     }
    //   })
    default:
      return state
  }
}
