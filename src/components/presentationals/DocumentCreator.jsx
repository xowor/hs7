import React from 'react'

import { hashHistory } from 'react-router'

import { DOCUMENT_TITLE_LENGTH_MAX } from '../../config'


const TypeEntry = React.createClass({
  propTypes: {
    enabled: React.PropTypes.bool,
    icon: React.PropTypes.string,
    name: React.PropTypes.string,
    onClick: React.PropTypes.func,
    type: React.PropTypes.string
  },
  handleClick(event) {
    this.props.onClick(event, this.props.type)
  },
  render() {
    return (
      <div
        className={ this.props.enabled }
        onClick={ this.handleClick }
      >
        <i
          aria-hidden="true"
          className={ `fa fa-fw fa-${this.props.icon}` }
        />
        { this.props.name }
      </div>
    )
  }
})


const DocumentCreator = React.createClass({
  propTypes: {
    createEmptyDocument: React.PropTypes.func,
    documentRequest: React.PropTypes.shape({
      action: React.PropTypes.string,
      pending: React.PropTypes.string.bool
    })
  },
  getInitialState() {
    return {
      step: '0',
      title: '',
      docType: 'text',
      doc: {}
    }
  },
  // componentWillMount() {
  // if (this.props.params.id === 'new') {
  //   this.props.createEmptyDocument()
  // } else {
  //   this.props.readDocument(this.props.params.id)
  // }
  // },
  // componentDidMount() {
  //   if (this.refs['iframe']) {
  //     console.log('iframe');
  //   } else {
  //     console.log('aaa');
  //   }
  // },
  componentWillReceiveProps(nextProps) {
    if (this.props.documentRequest.action === 'create') {
      if (this.props.documentRequest.pending &&
        !nextProps.documentRequest.pending) {
        hashHistory.push(`/document/edit/${nextProps.document._id}`)
      }
    }
  },
  // componentDidUpdate(nextProps) {
  //   if (nextProps.params.id != this.props.params.id) {
  //     // console.log(this.props.params.id);
  //     this.props.readDocument(this.props.params.id)
  //   }
  // },
  handleUpdateTitle(events) {
    const title = events.target.value

    if (title.length <= DOCUMENT_TITLE_LENGTH_MAX) {
      this.setState({ title })
    }
  },
  handleUpdateLink(event) {
    const url = event.target.value

    this.setState({ doc: { content: url } })
  },
  handleCreate() {
    if (this.state.docType === 'text') {
      this.createDocument()
    } else if (this.state.docType === 'link') {
      this.setState({ step: '1-link' })
    }
  },
  handleTypeChange(event, type) {
    this.setState({ docType: type })
  },
  createDocument() {
    // console.log('Save');
    this.props.createEmptyDocument(this.state.title, this.state.docType)
  },
  render() {
    // console.log(this.props);
    let content = null

    if (this.state.step === '0') {
      const checkTypeSelection = (type) => {
        if (this.state.docType === type) {
          return 'selected'
        }

        return ''
      }

      content = (
        <div className="document-creator">
          <h2>{ 'Create new document' }</h2>
          <div>
            <input
              autoFocus
              className="title"
              key="title"
              onChange={ this.handleUpdateTitle }
              placeholder="Document title"
              value={ this.state.title }
            />
          </div>
          <div className="types-list">
            <TypeEntry
              enabled={ checkTypeSelection('text') }
              icon={ 'align-justify' }
              name={ 'Text' }
              onClick={ this.handleTypeChange }
              type={ 'text' }
            />
            <TypeEntry
              enabled={ checkTypeSelection('link') }
              icon={ 'link' }
              name={ 'Link' }
              onClick={ this.handleTypeChange }
              type={ 'link' }
            />
          </div>
          <div>
            <button onClick={ this.handleCreate }>
              <i
                aria-hidden="true"
                className="fa fa-fw fa-check-circle-o"
              />
              { 'Create' }
            </button>
          </div>
        </div>
      )
    } else if (this.state.step === '1-link') {
      content = (
        <div>
          <h2>{ 'Write here the url link' }</h2>
          <div>
            <input
              autoFocus
              className="title"
              key="url"
              onChange={ this.handleUpdateLink }
              placeholder="Link URL"
              value={ this.state.doc.content }
            />
          </div>
          <div>
            <button onClick={ this.handleCreate }>
              <i
                aria-hidden="true"
                className="fa fa-fw fa-check-circle-o"
              />
              { 'Set link' }
            </button>
          </div>
        </div>
      )
    }


    return (
      <div className="document-creator">
        { content }
      </div>
    )
  }
})


export default DocumentCreator
