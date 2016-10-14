import React from 'react'

import { hashHistory } from 'react-router'

import Scroller from './Scroller'
import Textarea from 'react-textarea-autosize'
import TagsEditor from './TagsEditor'

import {
  DOCUMENT_TITLE_LENGTH_MAX,
  DOCUMENT_SYNOPSIS_LENGTH_MAX
} from '../../config'


const DocumentEditor = React.createClass({
  // propTypes: {
  //   // createEmptyDocument: React.PropTypes.func,
  //   document: React.PropTypes.shape({
  //     _id: React.PropTypes.string.isRequired,
  //     docType: React.PropTypes.string.isRequired,
  //     title: React.PropTypes.string.isRequired,
  //     synopsis: React.PropTypes.string.isRequired,
  //     content: React.PropTypes.string.isRequired
  //   }).isRequired,
  //   documentRequest: React.PropTypes.shape({
  //     action: React.PropTypes.string,
  //     pending: React.PropTypes.string.bool,
  //     error: React.PropTypes.string
  //   }).isRequired,
  //   location: React.PropTypes.shape({ pathname: React.PropTypes.string }),
  //   params: React.PropTypes.shape({ id: React.PropTypes.string }),
  //   readDocument: React.PropTypes.func,
  //   updateDocument: React.PropTypes.func
  // },
  getInitialState() {
    const pathname = this.props.location.pathname

    return {
      hasDocument: false,
      _id: '',
      title: '',
      content: '',
      synopsis: '',
      tags: [],
      relativePath: pathname.substr(0, pathname.lastIndexOf('/edit'))
    }
  },
  componentWillMount() {
    // if (this.props.params.id === 'new') {
      // this.props.createEmptyDocument()
    // } else {
    this.props.readDocument(this.props.params.id)
    // }
  },
  // componentDidMount() {
  //   if (this.refs['iframe']) {
  //     console.log('iframe');
  //   } else {
  //     console.log('aaa');
  //   }
  // },
  componentWillReceiveProps(nextProps) {
    if (!this.state.hasDocument && nextProps.document) {
      this.setState({
        _id: nextProps.document._id,
        title: nextProps.document.title,
        synopsis: nextProps.document.synopsis,
        tags: nextProps.document.tags,
        content: nextProps.document.content
      })
    }


    if (this.props.documentRequest.action === 'update' ||
      this.props.documentRequest.action === 'create') {
      if (this.props.documentRequest.pending &&
        !nextProps.documentRequest.pending) {
        // console.log(nextProps);
        hashHistory.push(`${this.state.relativePath}/view/${this.state._id}`)
      }
    }
  },
  componentDidUpdate(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      // console.log(this.props.params.id);
      this.props.readDocument(this.props.params.id)
    }
  },
  handleSave() {
    // console.log('Save');
    const doc = this.props.document

    doc.title = this.state.title
    doc.synopsis = this.state.synopsis
    doc.tags = this.state.tags
    doc.content = this.state.content
    if (doc._id) {
      this.props.updateDocument(doc)
    }
    // else {
    //   doc._id = uuid.v4();
    //   this.props.createDocument(doc)
    // }
  },
  handleTitleChange(event) {
    const title = event.target.value

    if (title.length <= DOCUMENT_TITLE_LENGTH_MAX) {
      this.setState({ title })
    }
  },
  handleSynopisChange(event) {
    const synopsis = event.target.value

    if (synopsis.length <= DOCUMENT_SYNOPSIS_LENGTH_MAX) {
      this.setState({ synopsis })
    }
  },
  handleContentChange(event) {
    const content = event.target.value

    this.setState({ content })
  },
  handleTagsChange(tags) {
    this.setState({ tags })
  },
  render() {
    // console.log(this.props);
    // if (!this.props.document) {
    //   return null
    // // } else if (this.props.document.id != this.props.params.id){
    // //   return null
    // } else {
    const doc = this.props.document || {}

    return (
      <div className="document-editor">
        <div className="title-bar">
          <input
            className="title"
            onChange={ this.handleTitleChange }
            placeholder="Document title"
            value={ this.state.title }
          />
          <div
            className="button"
            onClick={ this.handleSave }
          >
            <i
              aria-hidden="true"
              className="fa fa-check"
            />
          </div>
        </div>
        <TagsEditor
          tags={ doc.tags }
          onChange={ this.handleTagsChange }
        />
        <Scroller>
          <div className="synopsis">
            <Textarea
              onChange={ this.handleSynopisChange }
              placeholder="Document short synopsis"
              value={ this.state.synopsis }
            />
          </div>
          <div className="content">
            <Textarea
              onChange={ this.handleContentChange }
              value={ this.state.content }
            />
          </div>
        </Scroller>
      </div>
    )
    // }
  }
})


// DocumentEditor.contextTypes = {
//   muiTheme: React.PropTypes.object.isRequired,
// }

export default DocumentEditor
