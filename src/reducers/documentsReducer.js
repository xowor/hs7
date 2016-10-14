const initialState = {
  documents: {
    documents: [],
    request: {
      action: null,
      pending: false,
      error: null
    }
  },
  document: {
    document: null,
    request: {
      action: null,
      pending: false,
      error: null
    }
  }
}

export const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DOCUMENTS_READ_S':
      return Object.assign({}, state, {
        documents: {
          request: {
            action: 'read',
            pending: true,
            error: null
          }
        }
      })
    case 'DOCUMENTS_READ_R':
      return Object.assign({}, state, {
        documents: {
          documents: action.documents,
          request: {
            action: 'read',
            pending: false,
            error: null
          }
        }
      })
    case 'DOCUMENT_CREATE_S':
      return Object.assign({}, state, {
        document: {
          request: {
            action: 'create',
            pending: true,
            error: null
          }
        }
      })
    case 'DOCUMENT_CREATE_R':
      return Object.assign({}, state, {
        document: {
          document: action.document,
          request: {
            action: 'create',
            pending: false,
            error: null
          }
        }
      })
    case 'DOCUMENT_READ_S':
      return Object.assign({}, state, {
        document: {
          request: {
            action: 'read',
            pending: true,
            error: null
          }
        }
      })
    case 'DOCUMENT_READ_R':
      return Object.assign({}, state, {
        document: {
          document: action.document,
          request: {
            action: 'read',
            pending: false,
            error: null
          }
        }
      })
    case 'DOCUMENT_UPDATE_S':
      return Object.assign({}, state, {
        document: {
          request: {
            action: 'update',
            pending: true,
            error: null
          }
        }
      })
    case 'DOCUMENT_UPDATE_R':
      return Object.assign({}, state, {
        document: {
          document: action.document,
          request: {
            action: 'update',
            pending: false,
            error: null
          }
        }
      })
    default:
      return state
  }
}
