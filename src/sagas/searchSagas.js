
import { put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'
import { db } from '../db'
import {
  fetchLog,
  fetchCatch
} from '../lib/logger'


const searchParams = (query) => {
  return {
    include_docs: false,
    start_key: query,
    end_key: `${query}~`,
    inclusive_end: true,
    limit: 10
  }
}

function searchFetch(query) {
  console.log(searchParams(query));
  return db
    .query('search/search', searchParams(query))
    .then(fetchLog)
    .then((result) => result.rows.map((res) => res.value))
    .catch(fetchCatch)
}

function* search(action) {
  const results = yield call(searchFetch, action.query)

  yield put({
    type: 'SEARCH_SEARCH_R',
    results
  })
}


export function* watchSearch() {
  yield takeEvery('SEARCH_SEARCH_S', search)
}
