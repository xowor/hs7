import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { hashHistory } from 'react-router'

import TagsCloud from '../containers/TagsCloud'
import Filler from '../presentationals/Filler'

const TagsPage = React.createClass({
  shouldComponentUpdate() {
    if (window.location.hash.indexOf('/tags/') < 0) {
      return false
    }

    return true
  },
  render() {
    return (
      <div className="page-tags">
        <div className="content-left darker">
          <TagsCloud
            onSelect={ (name) => hashHistory.push(`/tags/${name}`) }
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
              <Filler message={ 'Select a tag to open it' } />,
              { key: window.location.hash.match(/\/[a-zA-Z0-9]*\/[a-zA-Z0-9]*/) }) }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
})

TagsPage.propTypes = { children: React.PropTypes.element }

export default TagsPage
