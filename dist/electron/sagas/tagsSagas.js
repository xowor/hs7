'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchReadTags = watchReadTags;
exports.watchReadTag = watchReadTag;

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _db = require('../db');

var _marked = [readTags, readTag, watchReadTags, watchReadTag].map(regeneratorRuntime.mark);
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'


var readTagsParams = {
  reduce: true,
  group: true
};

function readTagsFetch() {
  return _db.db.query('tags/all-tags', readTagsParams).then(function (result) {
    return result.rows.map(function (res) {
      return res.key;
    });
  });
}

function readTags() {
  var tags;
  return regeneratorRuntime.wrap(function readTags$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.call)(readTagsFetch);

        case 2:
          tags = _context.sent;


          console.log(tags);

          _context.next = 6;
          return (0, _effects.put)({
            type: 'TAGS_READ_R',
            tags: tags
          });

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var readTagParams = function readTagParams(tagsTitle) {
  return {
    include_docs: true,
    reduce: false,
    start_key: tagsTitle,
    end_key: tagsTitle + 'Z'
  };
};

// function readTagFetch(id) {
//   return db
//     .get(id)
//     .catch((err) => console.error(err))
//     // .query('test/tags-docs', readTagTagParams)
//     // .then((result) => result[0])
// }

function readTagDocumentsFetch(tag) {
  return _db.db.query('tags/all-tags', readTagParams(tag)).then(function (result) {
    return result.rows.map(function (res) {
      return res.value;
    });
  }).catch(function (err) {
    return console.error(err);
  });
}

function readTag(action) {
  var documents;
  return regeneratorRuntime.wrap(function readTag$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.call)(readTagDocumentsFetch, action.tag);

        case 2:
          documents = _context2.sent;
          _context2.next = 5;
          return (0, _effects.put)({
            type: 'TAG_READ_R',
            tag: action.tag,
            documents: documents
          });

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function watchReadTags() {
  return regeneratorRuntime.wrap(function watchReadTags$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _reduxSaga.takeEvery)('TAGS_READ_S', readTags);

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function watchReadTag() {
  return regeneratorRuntime.wrap(function watchReadTag$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _reduxSaga.takeEvery)('TAG_READ_S', readTag);

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}