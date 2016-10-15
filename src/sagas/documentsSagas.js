
import { put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'
import { db } from '../db'
import {
  fetchLog,
  fetchCatch
} from '../lib/logger'

import {
  readDocumentMiddleware,
  writeDocumentMiddleware
} from '../lib/middlewares/document'


function readDocumentsFetch() {
  return db
    .query('documents/all-docs', {
      include_docs: true,
      descending: true
    })
    .then((result) => result.rows.map((res) => res.doc))
    .catch(fetchCatch)
}

function* readDocuments() {
  const documents = yield call(readDocumentsFetch)

  yield put({
    type: 'DOCUMENTS_READ_R',
    documents
  })
}


function createEmptyDocumentFetch(title, docType) {
  const doc = writeDocumentMiddleware({
    // _id: uuid.v4(),
    title: title || 'New document',
    docType: docType || 'text',
    type: 'doc',
    tags: [],
    synopis: '',
    content: '',
    created: (new Date()).toISOString(),
    edited: (new Date()).toISOString()
  })

  return db
    .post(doc)
    .then((response) => {
      return { _id: response.id }
    })
    .catch(fetchCatch)
}

function* createEmptyDocument(action) {
  const doc = yield call(createEmptyDocumentFetch, action.title, action.docType)

  yield put({
    type: 'DOCUMENT_CREATE_R',
    document: doc
  })
}


function readDocumentFetch(id) {
  return db
    .get(id)
    .then(readDocumentMiddleware)
    .catch(fetchCatch)
}

function* readDocument(action) {
  const doc = yield call(readDocumentFetch, action.document._id)

  yield put({
    type: 'DOCUMENT_READ_R',
    document: doc
  })
}


function updateDocumentFetch(doc) {
  doc.edited = (new Date()).toISOString()
  doc = writeDocumentMiddleware(doc)

  return db
    .put(doc)
    .then(() => {
      return readDocumentFetch(doc._id)
    })
    .catch(fetchCatch)
}

function* updateDocument(action) {
  const doc = yield call(updateDocumentFetch, action.document)

  yield put({
    type: 'DOCUMENT_UPDATE_R',
    document: doc
  })
}


function removeDocumentFetch(doc) {
  doc._deleted = true

  return db
    .put(doc)
    .catch(fetchCatch)
}

function* removeDocument(action) {
  yield call(removeDocumentFetch, action.document)
  yield put({ type: 'DOCUMENT_REMOVE_R' })
}


export function* watchReadDocuments() {
  yield takeEvery('DOCUMENTS_READ_S', readDocuments)
}

export function* watchCreateEmptyDocument() {
  yield takeEvery('DOCUMENT_CREATE_S', createEmptyDocument)
}

export function* watchReadDocument() {
  yield takeEvery('DOCUMENT_READ_S', readDocument)
}

export function* watchUpdateDocument() {
  yield takeEvery('DOCUMENT_UPDATE_S', updateDocument)
  yield takeEvery('DOCUMENT_UPDATE_S', readDocuments)
}

export function* watchRemoveDocument() {
  yield takeEvery('DOCUMENT_REMOVE_S', removeDocument)
  yield takeEvery('DOCUMENT_REMOVE_S', readDocuments)
}

// export function* watchRemoveDocument() {
//   yield takeEvery('DOCUMENT_REMOVE_S', removeDocument)
// }
