'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Documents = require('./pages/Documents');

var _Documents2 = _interopRequireDefault(_Documents);

var _Topics = require('./pages/Topics');

var _Topics2 = _interopRequireDefault(_Topics);

var _Tags = require('./pages/Tags');

var _Tags2 = _interopRequireDefault(_Tags);

var _Database = require('./pages/Database');

var _Database2 = _interopRequireDefault(_Database);

var _Document = require('./pages/Document');

var _Document2 = _interopRequireDefault(_Document);

var _DocumentCreator = require('./containers/DocumentCreator');

var _DocumentCreator2 = _interopRequireDefault(_DocumentCreator);

var _TopicCreator = require('./containers/TopicCreator');

var _TopicCreator2 = _interopRequireDefault(_TopicCreator);

var _DocumentEditor = require('./containers/DocumentEditor');

var _DocumentEditor2 = _interopRequireDefault(_DocumentEditor);

var _DocumentViewer = require('./containers/DocumentViewer');

var _DocumentViewer2 = _interopRequireDefault(_DocumentViewer);

var _Filler = require('./presentationals/Filler');

var _Filler2 = _interopRequireDefault(_Filler);

var _Topic = require('./containers/Topic');

var _Topic2 = _interopRequireDefault(_Topic);

var _TagDocuments = require('./containers/TagDocuments');

var _TagDocuments2 = _interopRequireDefault(_TagDocuments);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(store, history) {
  (0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        _reactRouter.Router,
        { history: history },
        _react2.default.createElement(
          _reactRouter.Route,
          { component: _App2.default, path: '/' },
          _react2.default.createElement(
            _reactRouter.Route,
            { component: _Documents2.default, path: '/documents/' },
            _react2.default.createElement(_reactRouter.Route, { component: _DocumentViewer2.default, path: '/documents/view/:id' }),
            _react2.default.createElement(_reactRouter.Route, { component: _DocumentEditor2.default, path: '/documents/edit/:id' })
          ),
          _react2.default.createElement(
            _reactRouter.Route,
            { component: _Tags2.default, path: '/tags/' },
            _react2.default.createElement(
              _reactRouter.Route,
              { component: _TagDocuments2.default, path: '/tags/:tag' },
              _react2.default.createElement(_reactRouter.IndexRoute, { component: _Filler2.default }),
              _react2.default.createElement(_reactRouter.Route, { component: _DocumentViewer2.default, path: '/tags/:tag/view/:id' }),
              _react2.default.createElement(_reactRouter.Route, { component: _DocumentEditor2.default, path: '/tags/:tag/edit/:id' })
            )
          ),
          _react2.default.createElement(_reactRouter.Route, { component: _TopicCreator2.default, path: '/topics/new' }),
          _react2.default.createElement(
            _reactRouter.Route,
            { component: _Topics2.default, path: '/topics/' },
            _react2.default.createElement(
              _reactRouter.Route,
              { component: _Topic2.default, path: '/topics/:topicId' },
              _react2.default.createElement(_reactRouter.IndexRoute, { component: _Filler2.default }),
              _react2.default.createElement(_reactRouter.Route, { component: _DocumentViewer2.default, path: '/topics/:topicId/view/:id' }),
              _react2.default.createElement(_reactRouter.Route, { component: _DocumentEditor2.default, path: '/topics/:topicId/edit/:id' })
            )
          ),
          _react2.default.createElement(
            _reactRouter.Route,
            { component: _Document2.default, path: '/document/' },
            _react2.default.createElement(_reactRouter.Route, { component: _DocumentCreator2.default, path: '/document/new' }),
            _react2.default.createElement(_reactRouter.Route, { component: _DocumentViewer2.default, path: '/document/view/:id' }),
            _react2.default.createElement(_reactRouter.Route, { component: _DocumentEditor2.default, path: '/document/edit/:id' })
          ),
          _react2.default.createElement(_reactRouter.Route, { component: _Database2.default, path: '/database/' })
        ),
        _react2.default.createElement(_reactRouter.Route, { component: function component() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                null,
                '404 page not found'
              ),
              _react2.default.createElement(
                'p',
                null,
                'We are sorry but the page you are looking for does not exist.'
              )
            );
          }, path: '*' })
      )
    )
  ), document.getElementById('root'));
}