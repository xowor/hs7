'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchReadTopics = watchReadTopics;
exports.watchCreateTopic = watchCreateTopic;
exports.watchReadTopic = watchReadTopic;
exports.watchCreateTopicReloadTopics = watchCreateTopicReloadTopics;

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _db = require('../db');

var _marked = [readTopics, readTopic, createTopic, watchReadTopics, watchCreateTopic, watchReadTopic, watchCreateTopicReloadTopics].map(regeneratorRuntime.mark);
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'


var readTopicsParams = { include_docs: false };

function readTopicsFetch() {
  return _db.db.query('topics/topics', readTopicsParams).then(function (result) {
    return result.rows.map(function (res) {
      return res.value;
    });
  });
}

function readTopics() {
  var topics;
  return regeneratorRuntime.wrap(function readTopics$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.call)(readTopicsFetch);

        case 2:
          topics = _context.sent;
          _context.next = 5;
          return (0, _effects.put)({
            type: 'TOPICS_READ_R',
            topics: topics
          });

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var readTopicParams = function readTopicParams(topicTitle) {
  return {
    include_docs: true,
    start_key: topicTitle,
    end_key: topicTitle + 'Z'
  };
};

function readTopicFetch(id) {
  return _db.db.get(id).catch(function (err) {
    return console.error(err);
  });
  // .query('test/topics-docs', readTopicTopicParams)
  // .then((result) => result[0])
}

function readTopicDocumentsFetch(topicTitle) {
  return _db.db.query('topics/topics-docs', readTopicParams(topicTitle)).then(function (result) {
    return result.rows.map(function (res) {
      return res.value;
    });
  }).catch(function (err) {
    return console.error(err);
  });
}

function readTopic(action) {
  var topic, documents;
  return regeneratorRuntime.wrap(function readTopic$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.call)(readTopicFetch, action.topic._id);

        case 2:
          topic = _context2.sent;
          _context2.next = 5;
          return (0, _effects.call)(readTopicDocumentsFetch, topic.title);

        case 5:
          documents = _context2.sent;
          _context2.next = 8;
          return (0, _effects.put)({
            type: 'TOPIC_READ_R',
            topic: topic,
            documents: documents
          });

        case 8:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function createTopicFetch(title) {
  var doc = {
    title: title,
    type: 'topic',
    tags: [],
    synopis: '',
    content: ''
  };

  return _db.db.post(doc).then(function (result) {
    return result.id;
  }).catch(function (err) {
    return console.error(err);
  });
}

function createTopic(_ref) {
  var title = _ref.title;
  var topicId;
  return regeneratorRuntime.wrap(function createTopic$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.call)(createTopicFetch, title);

        case 2:
          topicId = _context3.sent;
          _context3.next = 5;
          return (0, _effects.put)({
            type: 'TOPIC_CREATE_R',
            topic: {
              _id: topicId,
              title: title
            }
          });

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function watchReadTopics() {
  return regeneratorRuntime.wrap(function watchReadTopics$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _reduxSaga.takeEvery)('TOPICS_READ_S', readTopics);

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function watchCreateTopic() {
  return regeneratorRuntime.wrap(function watchCreateTopic$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _reduxSaga.takeEvery)('TOPIC_CREATE_S', createTopic);

        case 2:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

function watchReadTopic() {
  return regeneratorRuntime.wrap(function watchReadTopic$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _reduxSaga.takeEvery)('TOPIC_READ_S', readTopic);

        case 2:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this);
}

function watchCreateTopicReloadTopics() {
  return regeneratorRuntime.wrap(function watchCreateTopicReloadTopics$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _reduxSaga.takeEvery)('TOPIC_CREATE_R', readTopics);

        case 2:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked[6], this);
}