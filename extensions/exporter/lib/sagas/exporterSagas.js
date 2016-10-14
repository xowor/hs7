
import { put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'
import { db } from '../../../../db'
import {
  fetchLog,
  fetchCatch
} from '../../../../lib/logger'


function* test() {
  yield put({
    type: 'EXT_EXPORTER_TEST_R'
  })
}


function* extExporterTest(action) {
  yield call(test, action)
  yield put({ type: 'EXT_EXPORTER_TEST_R' })
}

export function* exExporterWatchTest() {
  yield takeEvery('EXT_EXPORTER_TEST_S', extExporterTest)
}
