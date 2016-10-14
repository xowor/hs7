'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readDocuments = readDocuments;
exports.createEmptyDocument = createEmptyDocument;
exports.readDocument = readDocument;
exports.updateDocument = updateDocument;
exports.removeDocument = removeDocument;
function readDocuments() {
  return function (dispatch) {
    dispatch({ type: 'DOCUMENTS_READ_S' });
  };
}

function createEmptyDocument(title, docType) {
  return function (dispatch) {
    dispatch({
      type: 'DOCUMENT_CREATE_S',
      title: title,
      docType: docType
    });
  };
}

function readDocument(_id) {
  return function (dispatch) {
    dispatch({
      type: 'DOCUMENT_READ_S',
      document: { _id: _id }
    });
  };
}

function updateDocument(doc) {
  return function (dispatch) {
    dispatch({
      type: 'DOCUMENT_UPDATE_S',
      document: doc
    });
  };
}

function removeDocument(doc) {
  return function (dispatch) {
    dispatch({
      type: 'DOCUMENT_REMOVE_S',
      document: doc
    });
  };
}