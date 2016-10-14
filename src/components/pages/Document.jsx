import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const DocumentPage = React.createClass({
  shouldComponentUpdate() {
    if (window.location.hash.indexOf('/document/') < 0) {
      return false
    }

    return true
  },
  render() {
    return (
      <div className="page-document">
        <ReactCSSTransitionGroup
          component="div"
          transitionAppearTimeout={ 800 }
          transitionEnterTimeout={ 800 }
          transitionLeaveTimeout={ 800 }
          transitionName="page-transition-absolute"
        >
          { React.cloneElement(this.props.children ||
            React.createElement('div'),
            { key: window.location.hash.match(/\/[a-zA-Z0-9\/]*/g) }) }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})

DocumentPage.propTypes = { children: React.PropTypes.element }

export default DocumentPage
