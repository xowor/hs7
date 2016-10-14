import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { documentsReducer } from './documentsReducer'
import { searchReducer } from './searchReducer'
import { tagsReducer } from './tagsReducer'
import { topicsReducer } from './topicsReducer'
import { uiReducer } from './uiReducer'

import { platform } from '../lib/platforms/platform'



let reducers = {
  routing: routerReducer,
  documents: documentsReducer,
  search: searchReducer,
  tags: tagsReducer,
  topics: topicsReducer,
  ui: uiReducer
}

console.log(Object.assign(reducers, platform.extensions.reducers()));

export default combineReducers(Object.assign(reducers, platform.extensions.reducers()))
