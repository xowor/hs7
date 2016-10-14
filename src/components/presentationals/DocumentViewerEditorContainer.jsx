import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Filler from '../presentationals/Filler'


const DocumentViewerEditorContainer = React.createClass({
  propTypes: {
    children: React.PropTypes.element,
    emptyMessage: React.PropTypes.string
  },
  render() {
    return (
      <div className="document-viewer-editor-container">
        <ReactCSSTransitionGroup
          className="page-transition-bg"
          component="div"
          transitionAppearTimeout={ 800 }
          transitionEnterTimeout={ 800 }
          transitionLeaveTimeout={ 800 }
          transitionName="page-transition-relative"
        >
          { React.cloneElement(this.props.children ||
            <Filler message={ this.props.emptyMessage } />,
            { key: window.location.hash.match(/\/[a-zA-Z0-9\/]*/g) }) }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})

export default DocumentViewerEditorContainer
