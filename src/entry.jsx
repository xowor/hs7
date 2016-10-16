import { startupLog } from './lib/logger'


let platform
let store
let history

startupLog('Starting up')
  .then(startupLog('Loading platform-dependent layer'))
  .then(new Promise((resolve) => {
    platform = require('./lib/platforms/platform').platform
  }))
  .then(() => startupLog('Loading configuration'))
  .then(() => platform.config.read())
  .then(() => startupLog('Loading database'))
  .then(() => require('./db').setup())
  .then(() => startupLog('Loading extensions'))
  .then(() => platform.extensions.load())
  .then(() => startupLog('Loading app logic'))
  .then(() => new Promise((resolve, reject) => {
    const { Provider } = require('react-redux')
    const { createStore, applyMiddleware, compose } = require('redux')
    const reducers = require('./reducers').default

    const setupKeyboard = require('./keyboard').default
    const thunk = require('redux-thunk').default
    const createSagaMiddleware = require('redux-saga').default

    const rootSaga = require('./sagas').default

    const sagaMiddleware = createSagaMiddleware()

    const { Router, Route, hashHistory, IndexRoute } = require('react-router')
    const { syncHistoryWithStore } = require('react-router-redux')
    const injectTapEventPlugin = require('react-tap-event-plugin')


    // require('./styles/index.less')
    // require('font-awesome-webpack')

    store = createStore(reducers, compose(
      applyMiddleware(thunk),
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ?
      window.devToolsExtension() :
      (func) => func
      // window.devToolsExtension && window.devToolsExtension()
    ))

    sagaMiddleware.run(rootSaga)


    // Create an enhanced history that syncs navigation events with the store
    history = syncHistoryWithStore(hashHistory, store)
    // hashHistory.push('/boot/')

    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin()

    setupKeyboard(store)

    resolve()
  }))
  .then(() => startupLog('Starting GUI'))
  .then(() => require('./components/Root').render(store, history))
