import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { hashHistory } from 'react-router'

import DocumentsList from '../containers/DocumentsList'
import DocumentViewerEditorContainer from '../presentationals/DocumentViewerEditorContainer'
import Filler from '../presentationals/Filler'


const DocumentsPage = React.createClass({
  shouldComponentUpdate() {
    if (window.location.hash.indexOf('/documents/') < 0) {
      return false
    }

    return true
  },
  render() {
    return (
      <div className="page-documents">
        <div className="content-left darker">
          <DocumentsList
            onSelect={ (id) => hashHistory.push(`/documents/view/${id}`) }
          />
        </div>
        <div className="content-right">
          <DocumentViewerEditorContainer
            emptyMessage={ 'Select a document to open it' }
          >
            { this.props.children }
          </DocumentViewerEditorContainer>
        </div>
      </div>
    )
  }
})

DocumentsPage.propTypes = { children: React.PropTypes.element }

export default DocumentsPage
