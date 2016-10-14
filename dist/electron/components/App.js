'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Navbar = require('./containers/Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _SearchDialog = require('./containers/SearchDialog');

var _SearchDialog2 = _interopRequireDefault(_SearchDialog);

var _Filler = require('./presentationals/Filler');

var _Filler2 = _interopRequireDefault(_Filler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var computeKey = function computeKey(hash) {
  return (hash.match(/\/[a-zA-Z0-9]*[\/ | \?]/g) || ['/'])[0];
};

var App = function App(props) {
  return _react2.default.createElement(
    'div',
    { id: 'app-root' },
    _react2.default.createElement(_Navbar2.default, null),
    _react2.default.createElement(_SearchDialog2.default, null),
    _react2.default.createElement(
      'div',
      { id: 'app-content' },
      _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        {
          component: 'div',
          transitionAppearTimeout: 800,
          transitionEnterTimeout: 800,
          transitionLeaveTimeout: 800,
          transitionName: 'page-transition-absolute'
        },
        _react2.default.cloneElement(props.children || _react2.default.createElement(_Filler2.default, null), { key: computeKey(window.location.hash) }),
        console.log(computeKey(window.location.hash))
      )
    )
  );
};

App.propTypes = { children: _react2.default.PropTypes.element };

exports.default = App;