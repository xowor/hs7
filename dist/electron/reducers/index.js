'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _documentsReducer = require('./documentsReducer');

var _searchReducer = require('./searchReducer');

var _tagsReducer = require('./tagsReducer');

var _topicsReducer = require('./topicsReducer');

var _uiReducer = require('./uiReducer');

var _platform = require('../lib/platforms/platform');

var reducers = {
  routing: _reactRouterRedux.routerReducer,
  documents: _documentsReducer.documentsReducer,
  search: _searchReducer.searchReducer,
  tags: _tagsReducer.tagsReducer,
  topics: _topicsReducer.topicsReducer,
  ui: _uiReducer.uiReducer
};

console.log(Object.assign(reducers, _platform.platform.extensions.reducers()));

exports.default = (0, _redux.combineReducers)(Object.assign(reducers, _platform.platform.extensions.reducers()));