import { put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'
import { db } from '../db'


const readTagsParams = {
  reduce: true,
  group: true
}

function readTagsFetch() {
  return db
    .query('tags/all-tags', readTagsParams)
    .then((result) => result.rows.map((res) => res.key))
}

function* readTags() {
  const tags = yield call(readTagsFetch)

  console.log(tags);

  yield put({
    type: 'TAGS_READ_R',
    tags
  })
}


const readTagParams = (tagsTitle) => {
  return {
    include_docs: true,
    reduce: false,
    start_key: tagsTitle,
    end_key: `${tagsTitle}Z`
  }
}

// function readTagFetch(id) {
//   return db
//     .get(id)
//     .catch((err) => console.error(err))
//     // .query('test/tags-docs', readTagTagParams)
//     // .then((result) => result[0])
// }

function readTagDocumentsFetch(tag) {
  return db
    .query('tags/all-tags', readTagParams(tag))
    .then((result) => result.rows.map((res) => res.value))
    .catch((err) => console.error(err))
}


function* readTag(action) {
  const documents = yield call(readTagDocumentsFetch, action.tag)

  yield put({
    type: 'TAG_READ_R',
    tag: action.tag,
    documents
  })
}


export function* watchReadTags() {
  yield takeEvery('TAGS_READ_S', readTags)
}

export function* watchReadTag() {
  yield takeEvery('TAG_READ_S', readTag)
}
