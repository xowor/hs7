import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import DocumentListItem from '../presentationals/DocumentListItem'
import DocumentViewerEditorContainer from '../presentationals/DocumentViewerEditorContainer'

import { hashHistory } from 'react-router'


const DocumentsList = React.createClass({
  propTypes: {
    children: React.PropTypes.element,
    documents: React.PropTypes.arrayOf(React.PropTypes.shape()),
    params: React.PropTypes.shape({ topicId: React.PropTypes.string }),
    readTopic: React.PropTypes.func,
    topic: React.PropTypes.shape({})
  },
  componentWillMount() {
    this.props.readTopic(this.props.params.topicId)
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.documentsRequest.pending) {
      return false
    }

    return true
  },
  handleViewDocument(docId) {
    hashHistory.push(`/topics/${this.props.params.topicId}/view/${docId}`)
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

    console.log(this.props.topic)

    return (
      <div className="topic">
        <div className="darker documents-list">
          <div className="topic-title">
            <p>
              { this.props.topic.title }
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


export default DocumentsList
