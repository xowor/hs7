
import { put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'
import { db } from '../db'


const readTopicsParams = { include_docs: false }

function readTopicsFetch() {
  return db
    .query('topics/topics', readTopicsParams)
    .then((result) => result.rows.map((res) => res.value))
}

function* readTopics() {
  const topics = yield call(readTopicsFetch)

  yield put({
    type: 'TOPICS_READ_R',
    topics
  })
}


const readTopicParams = (topicTitle) => {
  return {
    include_docs: true,
    start_key: topicTitle,
    end_key: `${topicTitle}Z`
  }
}

function readTopicFetch(id) {
  return db
    .get(id)
    .catch((err) => console.error(err))
    // .query('test/topics-docs', readTopicTopicParams)
    // .then((result) => result[0])
}

function readTopicDocumentsFetch(topicTitle) {
  return db
    .query('topics/topics-docs', readTopicParams(topicTitle))
    .then((result) => result.rows.map((res) => res.value))
    .catch((err) => console.error(err))
}


function* readTopic(action) {
  const topic = yield call(readTopicFetch, action.topic._id)
  const documents = yield call(readTopicDocumentsFetch, topic.title)

  yield put({
    type: 'TOPIC_READ_R',
    topic,
    documents
  })
}


function createTopicFetch(title) {
  const doc = {
    title,
    type: 'topic',
    tags: [],
    synopis: '',
    content: ''
  }

  return db
    .post(doc)
    .then((result) => result.id)
    .catch((err) => console.error(err))
}


function* createTopic({ title }) {
  const topicId = yield call(createTopicFetch, title)

  yield put({
    type: 'TOPIC_CREATE_R',
    topic: {
      _id: topicId,
      title
    }
  })
}


export function* watchReadTopics() {
  yield takeEvery('TOPICS_READ_S', readTopics)
}

export function* watchCreateTopic() {
  yield takeEvery('TOPIC_CREATE_S', createTopic)
}

export function* watchReadTopic() {
  yield takeEvery('TOPIC_READ_S', readTopic)
}

export function* watchCreateTopicReloadTopics() {
  yield takeEvery('TOPIC_CREATE_R', readTopics)
}
