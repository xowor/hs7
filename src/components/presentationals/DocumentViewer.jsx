import React from 'react'

import { hashHistory } from 'react-router'
import marked from 'marked'


import Scroller from './Scroller'

const DocumentViewer = React.createClass({
  propTypes: {
    // createEmptyDocument: React.PropTypes.func,
    document: React.PropTypes.shape({
      _id: React.PropTypes.string.isRequired,
      docType: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      synopsis: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired
    }).isRequired,
    location: React.PropTypes.shape({ pathname: React.PropTypes.string }),
    params: React.PropTypes.shape({ id: React.PropTypes.string }),
    readDocument: React.PropTypes.func,
    removeDocument: React.PropTypes.func
  },
  getInitialState() {
    const pathname = this.props.location.pathname

    return { relativePath: pathname.substr(0, pathname.lastIndexOf('/view')) }
  },
  componentWillMount() {
    this.props.readDocument(this.props.params.id)
  },
  // componentDidMount() {
  //   if (this.refs['iframe']) {
  //     console.log('iframe');
  //   } else {
  //     console.log('aaa');
  //   }
  // },
  componentDidUpdate(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.readDocument(this.props.params.id)
    }
  },
  handleExpand() {
    hashHistory.push(`/document/view/${this.props.params.id}`)
  },
  handleEdit() {
    hashHistory.push(`${this.state.relativePath}/edit/${this.props.params.id}`)
  },
  handleDelete() {
    this.props.removeDocument(this.props.document)
    hashHistory.push(`${this.state.relativePath}/`)
  },
  render() {
    const doc = this.props.document || {
      _id: '',
      title: '',
      synopsis: '',
      tags: [],
      content: ''
    }

    let expandButton = null

    if (this.state.relativePath !== '/document') {
      expandButton = (
        <div
          className="button"
          onClick={ this.handleExpand }
        >
          <i
            aria-hidden="true"
            className="fa fa-expand"
          />
        </div>
      )
    }

    return (
      <div className="document-viewer">
        <div className="title-bar">
          <h2 className="title">
            {doc.title || 'Untitled document'}
          </h2>
          <div
            className="button"
            onClick={ this.handleEdit }
          >
            <i
              aria-hidden="true"
              className="fa fa-pencil"
            />
          </div>
          <div
            className="button"
            onClick={ this.handleDelete }
          >
            <i
              aria-hidden="true"
              className="fa fa-trash"
            />
          </div>
          { expandButton }
        </div>
        <Scroller>
          <div className="synopsis">{doc.synopsis || 'No synopsis yet'}</div>
          <div
            className="content"
            dangerouslySetInnerHTML={ { __html: marked(doc.content) || '' } }
          />
        </Scroller>
      </div>
    )
    // }
  }
})

export default DocumentViewer
