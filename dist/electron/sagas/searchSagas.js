'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchSearch = watchSearch;

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _db = require('../db');

var _logger = require('../lib/logger');

var _marked = [search, watchSearch].map(regeneratorRuntime.mark);
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'


var searchParams = function searchParams(query) {
  return {
    include_docs: false,
    start_key: query,
    end_key: query + 'Z',
    inclusive_end: true,
    limit: 10
  };
};

function searchFetch(query) {
  console.log(searchParams(query));
  return _db.db.query('search/search', searchParams(query)).then(_logger.fetchLog).then(function (result) {
    return result.rows.map(function (res) {
      return res.value;
    });
  }).catch(_logger.fetchCatch);
}

function search(action) {
  var results;
  return regeneratorRuntime.wrap(function search$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.call)(searchFetch, action.query);

        case 2:
          results = _context.sent;
          _context.next = 5;
          return (0, _effects.put)({
            type: 'SEARCH_SEARCH_R',
            results: results
          });

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function watchSearch() {
  return regeneratorRuntime.wrap(function watchSearch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _reduxSaga.takeEvery)('SEARCH_SEARCH_S', search);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}