import {
  watchReadTopics,
  watchCreateTopic,
  watchCreateTopicReloadTopics,
  watchReadTopic
} from './topicsSagas'

import {
  watchReadTags,
  watchReadTag
} from './tagsSagas'

import {
  watchReadDocuments,
  watchCreateEmptyDocument,
  watchReadDocument,
  watchUpdateDocument,
  watchRemoveDocument
} from './documentsSagas'

import {
  watchSearch
} from './searchSagas'

import { platform } from '../lib/platforms/platform'


export default function* rootSaga() {
  const sagas = [
    watchReadTopics(),
    watchCreateTopic(),
    watchCreateTopicReloadTopics(),
    watchReadTopic(),
    watchReadDocuments(),
    watchCreateEmptyDocument(),
    watchReadDocument(),
    watchUpdateDocument(),
    watchRemoveDocument(),
    watchReadTags(),
    watchReadTag(),
    watchSearch()
  ].concat(platform.extensions.sagas())

  console.log(sagas);

  yield sagas
}
