import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Navbar from './containers/Navbar'
import SearchDialog from './containers/SearchDialog'
import Filler from './presentationals/Filler'


const computeKey = (hash) =>
  (hash.match(/\/[a-zA-Z0-9]*[\/ | \?]/g) || ['/'])[0]

const App = (props) => (
  <div id="app-root">
    <Navbar />
    <SearchDialog />
    <div id="app-content">
      <ReactCSSTransitionGroup
        component="div"
        transitionAppearTimeout={ 800 }
        transitionEnterTimeout={ 800 }
        transitionLeaveTimeout={ 800 }
        transitionName="page-transition-absolute"
      >
        { React.cloneElement(props.children ||
          <Filler />,
          { key: computeKey(window.location.hash) }) }
        {console.log(computeKey(window.location.hash))}
      </ReactCSSTransitionGroup>
    </div>
  </div>
)

App.propTypes = { children: React.PropTypes.element }

export default App
