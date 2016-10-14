'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readTopics = readTopics;
exports.createTopic = createTopic;
exports.readTopic = readTopic;

var _db = require('../db');

function readTopics() {
  return function (dispatch) {
    dispatch({ type: 'TOPICS_READ_S' });
  };
}
// export function readTopics() {
//   return (dispatch, getState) => {
//     dispatch({
//       type: 'TOPICS_READ',
//       topics: [],
//       request: {
//         action: 'read',
//         pending: true,
//         error: null
//       }
//     });
//
//     db.query('test/topics', {
//       include_docs: false
//     })
//       .then(function (result) {
//         dispatch({
//           type: 'TOPICS_READ',
//           topics: result.rows.map(res => res.value),
//           request: {
//             action: 'read',
//             pending: false,
//             error: null
//           }
//         });
//       })
//       .catch(function (error) {
//         throw(error);
//         dispatch({
//           type: 'TOPICS_READ',
//           documents: null,
//           request: {
//             action: 'read',
//             pending: false,
//             error: error
//           }
//         });
//       });
//
//   };
// }


/*
export function searchDocuments(query) {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOPICS_READ',
      documents: [],
      request: {
        action: 'read',
        pending: true,
        error: null
      }
    });
    axios.get('/api/documents' + '?title=' + encodeURIComponent(query))
      .then(function (response) {
        dispatch({
          type: 'TOPICS_READ',
          documents: response.data.documents,
          request: {
            action: 'read',
            pending: false,
            error: null
          }
        });
      })
      .catch(function (error) {
        throw(error);
        dispatch({
          type: 'TOPICS_READ',
          documents: null,
          request: {
            action: 'read',
            pending: false,
            error: error
          }
        });
      });

  };
}

*/

function createTopic(title) {
  return function (dispatch) {
    dispatch({
      type: 'TOPIC_CREATE_S',
      title: title
    });
  };
}
// export function createTopic(title) {
//   return (dispatch, getState) => {
//     let doc = {
//       title: title,
//       type: 'topic',
//       tags: [],
//       synopis: '',
//       content: '',
//     }
//     dispatch({
//       type: 'TOPIC_CREATE',
//       document: null,
//       request: {
//         action: 'create',
//         pending: true,
//         error: null
//       }
//     });
//     db.post(doc).then(function(response) {
//       console.log(response);
//       dispatch({
//         type: 'TOPIC_CREATE',
//         document: {
//           _id: response.id
//         },
//         request: {
//           action: 'create',
//           pending: false,
//           error: null
//         }
//       });
//     }).catch(function(error) {
//       throw(error);
//       dispatch({
//         type: 'TOPIC_CREATE',
//         document: null,
//         request: {
//           action: 'create',
//           pending: false,
//           error: error
//         }
//       })
//     })
//   }
// }

function readTopic(id) {
  return function (dispatch) {
    dispatch({
      type: 'TOPIC_READ_S',
      topic: { _id: id },
      request: {
        action: 'read',
        pending: true,
        error: null
      }
    });
  };
}

// export function readTopic(id) {
//   return (dispatch, getState) => {
//     dispatch({
//       type: 'TOPIC_READ',
//       topic: null,
//       documents: null,
//       request: {
//         action: 'read',
//         pending: true,
//         error: null
//       }
//     });
//     let topicResult
//     db.get(id)
//       .then(function (result) {
//         return db.query('test/topics-docs', {
//           include_docs: false,
//           start_key: result.title,
//           end_key: result.title + 'Z'
//         })
//         topicResult = result
//       })
//       .then(function (result) {
//         console.log(result);
//         dispatch({
//           type: 'TOPIC_READ',
//           topic: topicResult,
//           documents: result.rows.map(res => res.value),
//           request: {
//             action: 'read',
//             pending: false,
//             error: null
//           }
//         });
//       })
//       .catch(function (error) {
//         throw(error);
//         dispatch({
//           type: 'TOPIC_READ',
//           topic: null,
//           documents: null,
//           request: {
//             action: 'read',
//               action: 'update',
//             pending: false,
//             error: error
//           }
//         });
//       });
//
//   };
// }
/*
export function updateDocument(doc) {
  return (dispatch, getState) => {
    dispatch({
      type: 'DOCUMENT_UPDATE',
      document: null,
      request: {
        action: 'update',
        pending: true,
        error: null
      }
    });
    // doc._rev = '1-' + uuid.v4().replace(/-/g, '')
    db.put(doc)
      .then(function (response) {
        dispatch({
          type: 'DOCUMENT_UPDATE',
          document: response.data,
          request: {
            action: 'update',
            pending: false,
            error: null
          }
        });
      })
      .catch(function (error) {
        throw(error);
        dispatch({
          type: 'DOCUMENT_UPDATE',
          document: null,
          request: {
            action: 'update',
            pending: false,
            error: error
          }
        });
      });

  };
}

export function createDocument(doc) {
  return (dispatch, getState) => {
    dispatch({
      type: 'DOCUMENT_CREATE',
      document: null,
      request: {
        action: 'create',
        pending: true,
        error: null
      }
    });
    axios.post('/api/documents/', doc)
      .then(function (response) {
        dispatch({
          type: 'DOCUMENT_CREATE',
          document: response.data,
          request: {
            action: 'create',
            pending: false,
            error: null
          }
        });
      })
      .catch(function (error) {
        throw(error);
        dispatch({
          type: 'DOCUMENT_CREATE',
          document: null,
          request: {
            action: 'create',
            pending: false,
            error: error
          }
        });
      });

  };
}

export function removeDocument(id) {
  return (dispatch, getState) => {
    dispatch({
      type: 'DOCUMENT_REMOVE',
      request: {
        action: 'remove',
        pending: true,
        error: null
      }
    });
    axios.delete('/api/documents/' + id)
      .then(function (response) {
        dispatch({
          type: 'DOCUMENT_REMOVE',
          request: {
            action: 'remove',
            pending: false,
            error: null
          }
        });
      })
      .catch(function (error) {
        throw(error);
        dispatch({
          type: 'DOCUMENT_REMOVE',
          request: {
            action: 'remove',
            pending: false,
            error: error
          }
        });
      });

  };
}

*/