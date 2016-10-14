import React from 'react'

import DocumentListItem from '../presentationals/DocumentListItem'

import { hashHistory } from 'react-router'


const MixedList = React.createClass({
  handleDocClick(docId) {
    hashHistory.push(`/documents/view/${docId}`)
    if (this.props.closeSearchDialog) {
      this.props.closeSearchDialog()
    }
  },
  handleTagClick(tag) {
    hashHistory.push(`/tags/${tag}`)
    if (this.props.closeSearchDialog) {
      this.props.closeSearchDialog()
    }
  },
  render() {
    const results = this.props.results
    const docs = {}
    const docsElements = []
    const tags = {}
    const tagsElements = []

    for (let i = 0; i < results.length; i++) {
      if (results[i].search_result_type === 'doc') {
        docs[results[i]._id] = results[i]
      } else if (results[i].search_result_type === 'tag') {
        tags[results[i].tag] = results[i].tag
      }
    }

    for (let doc in docs) {
      if (docs.hasOwnProperty(doc)) {
        docsElements.push(
          <DocumentListItem
            document={ docs[doc] }
            key={ doc + '' }
            onClick={ () => this.handleDocClick(docs[doc]._id) }
          />
        )
      }
    }

    for (let tag in tags) {
      if (tags.hasOwnProperty(tag)) {
        tagsElements.push(
          <div
            className="tag"
            key={ tag + '' }
            onClick={ () => this.handleTagClick(tag) }
          >
            { tag }
          </div>
        )
      }
    }

    return (
      <div className="mixed-list">
        <div className="mixed-list-tags">
          { tagsElements }
        </div>
        <div className="mixed-list-docs">
          { docsElements }
        </div>
      </div>
    )
  }
})


export default MixedList
