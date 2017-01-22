import React from 'react'
import {render as reactRender} from 'react-dom'
import {Provider} from 'react-redux'

import App from './App'
import DocumentsPage from './pages/Documents'
import TopicsPage from './pages/Topics'
import TagsPage from './pages/Tags'
import DatabasePage from './pages/Database'
import SettingsPage from './pages/Settings'
import Document from './pages/Document'
import DocumentCreator from './containers/DocumentCreator'
import TopicCreator from './containers/TopicCreator'
import DocumentEditor from './containers/DocumentEditor'
import DocumentViewer from './containers/DocumentViewer'
import SettingsEntryViewer from './presentationals/SettingsEntryViewer'
import Filler from './presentationals/Filler'
import Topic from './containers/Topic'
import TagDocuments from './containers/TagDocuments'

import {Router, Route, hashHistory, IndexRoute} from 'react-router'

export function render(store, history) {
  reactRender(
    <Provider store={store}>
      <div className="container">
        <Router history={history}>
          <Route component={App} path="/">
            <Route component={DocumentsPage} path="/documents/">
              <Route component={DocumentViewer} path="/documents/view/:id"/>
              <Route component={DocumentEditor} path="/documents/edit/:id"/>
            </Route>
            <Route component={TagsPage} path="/tags/">
              <Route component={TagDocuments} path="/tags/:tag">
                <IndexRoute component={Filler}/>
                <Route component={DocumentViewer} path="/tags/:tag/view/:id"/>
                <Route component={DocumentEditor} path="/tags/:tag/edit/:id"/>
              </Route>
            </Route>
            <Route component={TopicCreator} path="/topics/new"/>
            <Route component={TopicsPage} path="/topics/">
              <Route component={Topic} path="/topics/:topicId">
                <IndexRoute component={Filler}/>
                <Route component={DocumentViewer} path="/topics/:topicId/view/:id"/>
                <Route component={DocumentEditor} path="/topics/:topicId/edit/:id"/>
              </Route>
            </Route>
            <Route component={Document} path="/document/">
              <Route component={DocumentCreator} path="/document/new"/>
              <Route component={DocumentViewer} path="/document/view/:id"/>
              <Route component={DocumentEditor} path="/document/edit/:id"/>
            </Route>
            <Route component={DatabasePage} path="/database/"/>
            <Route component={SettingsPage} path="/settings/">
              <Route component={SettingsEntryViewer} path="/settings/:id"/>
            </Route>
          </Route>
          <Route component={() =>
            <div>
              <h3>{'404 page not found'}</h3>
              <p>{`We are sorry but the page you are looking for does not exist.`}</p>
            </div>} path="*"/>
      </Router>
    </div>
  </Provider>, document.getElementById('root'))

}
