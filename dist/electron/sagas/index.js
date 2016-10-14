'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rootSaga;

var _topicsSagas = require('./topicsSagas');

var _tagsSagas = require('./tagsSagas');

var _documentsSagas = require('./documentsSagas');

var _searchSagas = require('./searchSagas');

var _platform = require('../lib/platforms/platform');

var _marked = [rootSaga].map(regeneratorRuntime.mark);

function rootSaga() {
  var sagas;
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sagas = [(0, _topicsSagas.watchReadTopics)(), (0, _topicsSagas.watchCreateTopic)(), (0, _topicsSagas.watchCreateTopicReloadTopics)(), (0, _topicsSagas.watchReadTopic)(), (0, _documentsSagas.watchReadDocuments)(), (0, _documentsSagas.watchCreateEmptyDocument)(), (0, _documentsSagas.watchReadDocument)(), (0, _documentsSagas.watchUpdateDocument)(), (0, _documentsSagas.watchRemoveDocument)(), (0, _tagsSagas.watchReadTags)(), (0, _tagsSagas.watchReadTag)(), (0, _searchSagas.watchSearch)()].concat(_platform.platform.extensions.sagas());


          console.log(sagas);

          _context.next = 4;
          return sagas;

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}