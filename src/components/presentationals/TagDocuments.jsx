import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import DocumentListItem from '../presentationals/DocumentListItem'
import DocumentViewerEditorContainer from '../presentationals/DocumentViewerEditorContainer'

import { hashHistory } from 'react-router'


const TagDocuments = React.createClass({

  componentWillMount() {
    this.props.readTag(this.props.params.tag)
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.documentsRequest.pending) {
      return false
    }

    return true
  },
  handleViewDocument(docId) {
    hashHistory.push(`/tags/${this.props.params.tag}/view/${docId}`)
  },
  render() {
    const documents = this.props.documents
    const docs = []

    for (let i = 0; i < documents.length; i++) {
      docs.push(
        <DocumentListItem
          document={ documents[i] }
          key={ i }
          onClick={ this.handleViewDocument }
        />
      )
    }

    console.log(this.props.tag)

    return (
      <div className="tag-documents">
        <div className="darker documents-list">
          <div className="tag-title">
            <p>
              { this.props.tag.title }
            </p>
          </div>
          { docs }
        </div>
        <div className="content">
          <div className="content-right">
            <DocumentViewerEditorContainer
              emptyMessage={ 'Select a document to open it' }
            >
              { this.props.children }
            </DocumentViewerEditorContainer>
          </div>
        </div>
      </div>
    )
  }
})


export default TagDocuments
