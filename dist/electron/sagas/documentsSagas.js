'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchReadDocuments = watchReadDocuments;
exports.watchCreateEmptyDocument = watchCreateEmptyDocument;
exports.watchReadDocument = watchReadDocument;
exports.watchUpdateDocument = watchUpdateDocument;
exports.watchRemoveDocument = watchRemoveDocument;

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _db = require('../db');

var _logger = require('../lib/logger');

var _document = require('../lib/middlewares/document');

var _marked = [readDocuments, createEmptyDocument, readDocument, updateDocument, removeDocument, watchReadDocuments, watchCreateEmptyDocument, watchReadDocument, watchUpdateDocument, watchRemoveDocument].map(regeneratorRuntime.mark);
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'


function readDocumentsFetch() {
  return _db.db.query('documents/all-docs', {
    include_docs: true,
    descending: true
  }).then(function (result) {
    return result.rows.map(function (res) {
      return res.doc;
    });
  }).catch(_logger.fetchCatch);
}

function readDocuments() {
  var documents;
  return regeneratorRuntime.wrap(function readDocuments$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.call)(readDocumentsFetch);

        case 2:
          documents = _context.sent;
          _context.next = 5;
          return (0, _effects.put)({
            type: 'DOCUMENTS_READ_R',
            documents: documents
          });

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function createEmptyDocumentFetch(title, docType) {
  var doc = (0, _document.writeDocumentMiddleware)({
    // _id: uuid.v4(),
    title: title || 'New document',
    docType: docType || 'text',
    type: 'doc',
    tags: [],
    synopis: '',
    content: '',
    created: new Date().toISOString(),
    edited: new Date().toISOString()
  });

  return _db.db.post(doc).then(function (response) {
    return { _id: response.id };
  }).catch(_logger.fetchCatch);
}

function createEmptyDocument(action) {
  var doc;
  return regeneratorRuntime.wrap(function createEmptyDocument$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.call)(createEmptyDocumentFetch, action.title, action.docType);

        case 2:
          doc = _context2.sent;
          _context2.next = 5;
          return (0, _effects.put)({
            type: 'DOCUMENT_CREATE_R',
            document: doc
          });

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function readDocumentFetch(id) {
  return _db.db.get(id).then(_document.readDocumentMiddleware).catch(_logger.fetchCatch);
}

function readDocument(action) {
  var doc;
  return regeneratorRuntime.wrap(function readDocument$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.call)(readDocumentFetch, action.document._id);

        case 2:
          doc = _context3.sent;
          _context3.next = 5;
          return (0, _effects.put)({
            type: 'DOCUMENT_READ_R',
            document: doc
          });

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function updateDocumentFetch(doc) {
  doc.edited = new Date().toISOString();
  doc = (0, _document.writeDocumentMiddleware)(doc);

  return _db.db.put(doc).then(function () {
    return readDocumentFetch(doc._id);
  }).catch(_logger.fetchCatch);
}

function updateDocument(action) {
  var doc;
  return regeneratorRuntime.wrap(function updateDocument$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.call)(updateDocumentFetch, action.document);

        case 2:
          doc = _context4.sent;
          _context4.next = 5;
          return (0, _effects.put)({
            type: 'DOCUMENT_UPDATE_R',
            document: doc
          });

        case 5:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function removeDocumentFetch(doc) {
  doc._deleted = true;

  return _db.db.put(doc).catch(_logger.fetchCatch);
}

function removeDocument(action) {
  return regeneratorRuntime.wrap(function removeDocument$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.call)(removeDocumentFetch, action.document);

        case 2:
          _context5.next = 4;
          return (0, _effects.put)({ type: 'DOCUMENT_REMOVE_R' });

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

function watchReadDocuments() {
  return regeneratorRuntime.wrap(function watchReadDocuments$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _reduxSaga.takeEvery)('DOCUMENTS_READ_S', readDocuments);

        case 2:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this);
}

function watchCreateEmptyDocument() {
  return regeneratorRuntime.wrap(function watchCreateEmptyDocument$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _reduxSaga.takeEvery)('DOCUMENT_CREATE_S', createEmptyDocument);

        case 2:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked[6], this);
}

function watchReadDocument() {
  return regeneratorRuntime.wrap(function watchReadDocument$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _reduxSaga.takeEvery)('DOCUMENT_READ_S', readDocument);

        case 2:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked[7], this);
}

function watchUpdateDocument() {
  return regeneratorRuntime.wrap(function watchUpdateDocument$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _reduxSaga.takeEvery)('DOCUMENT_UPDATE_S', updateDocument);

        case 2:
          _context9.next = 4;
          return (0, _reduxSaga.takeEvery)('DOCUMENT_UPDATE_S', readDocuments);

        case 4:
        case 'end':
          return _context9.stop();
      }
    }
  }, _marked[8], this);
}

function watchRemoveDocument() {
  return regeneratorRuntime.wrap(function watchRemoveDocument$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _reduxSaga.takeEvery)('DOCUMENT_REMOVE_S', removeDocument);

        case 2:
          _context10.next = 4;
          return (0, _reduxSaga.takeEvery)('DOCUMENT_REMOVE_S', readDocuments);

        case 4:
        case 'end':
          return _context10.stop();
      }
    }
  }, _marked[9], this);
}

// export function* watchRemoveDocument() {
//   yield takeEvery('DOCUMENT_REMOVE_S', removeDocument)
// }