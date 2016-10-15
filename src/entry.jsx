import { platform } from './lib/platforms/platform'

console.log(platform);

let store
let history

platform.config.read()
  .then(() => console.log('Configuration loaded'))
  .then(() => {
    require('./db')
  })
  .then(platform.extensions.load)
  .then(() => console.log('Extensions loaded'))
  .then(() => {
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
    hashHistory.push('/documents/')

    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin()

    setupKeyboard(store)
  })
  .then(() => console.log('App logic loaded'))
  .then(() => {
    console.log('Now rendering UI')

    require('./components/Root').render(store, history)
  })
