import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { hashHistory } from 'react-router'

import TopicsList from '../containers/TopicsList'
import Filler from '../presentationals/Filler'

const TopicsPage = React.createClass({
  shouldComponentUpdate() {
    if (window.location.hash.indexOf('/topics/') < 0) {
      return false
    }

    return true
  },
  render() {
    return (
      <div className="page-topics">
        <div className="content-left darker">
          <TopicsList
            onSelect={ (name) => hashHistory.push(`/topics/${name}`) }
          />
        </div>
        <div className="content-right">
          <ReactCSSTransitionGroup
            component="div"
            transitionAppearTimeout={ 800 }
            transitionEnterTimeout={ 800 }
            transitionLeaveTimeout={ 800 }
            transitionName="page-transition-absolute"
          >
            { React.cloneElement(this.props.children ||
              <Filler message={ 'Select a topic to open it' } />,
              { key: window.location.hash.match(/\/[a-zA-Z0-9]*\/[a-zA-Z0-9]*/) }) }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
})

TopicsPage.propTypes = { children: React.PropTypes.element }

export default TopicsPage
