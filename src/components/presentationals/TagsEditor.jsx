import React from 'react'

import { hashHistory } from 'react-router'

import {
  DOCUMENT_TITLE_LENGTH_MAX,
  DOCUMENT_SYNOPSIS_LENGTH_MAX
} from '../../config'


const TagsEditor = React.createClass({
  getInitialState() {
    return {
      hasTags: false,
      tags: [],
      inputValue: ''
    }
  },
  componentWillReceiveProps(nextProps) {
    if (!this.state.hasTags && nextProps.tags) {
      this.setState({
        hasTags: true,
        tags: nextProps.tags.map((tag) => {
          return tag
        })
      })
    }
  },
  // componentDidUpdate(nextProps, nextState) {
  //   if (nextState.tags.length !== this.state.tags.length) {
  //     this.props.onChange(this.state.tags)
  //   }
  // },
  // handleSave() {
  //   // console.log('Save');
  //   const doc = this.props.document
  //
  //   doc.title = this.state.title
  //   doc.synopsis = this.state.synopsis
  //   doc.content = this.state.content
  //   if (doc._id) {
  //     this.props.updateDocument(doc)
  //   }
  //   // else {
  //   //   doc._id = uuid.v4();
  //   //   this.props.createDocument(doc)
  //   // }
  // },
  addTag(tag) {
    if (tag.length > 3) {
      const tags = this.state.tags

      tags.push(tag)

      this.setState({
        tags,
        inputValue: ''
      })

      this.props.onChange(tags)
    }
  },
  removeLastTag() {
    if (this.state.inputValue.length === 0) {
      const tags = this.state.tags

      tags.pop()

      this.setState({ tags })

      this.props.onChange(tags)
    }
  },
  // handleSynopisChange(event) {
  //   const synopsis = event.target.value
  //
  //   if (synopsis.length <= DOCUMENT_SYNOPSIS_LENGTH_MAX) {
  //     this.setState({ synopsis })
  //   }
  // },
  // handleContentChange(event) {
  //   const content = event.target.value
  //
  //   this.setState({ content })
  // },
  // handleKeyPress(event) {
  //   // console.log(event.keyCode);
  //   if (event.key === 'Enter') {
  //   } else if (event.keyCode) {
  //   }
  // },
  handleKeyDown(event) {
    switch (event.keyCode) {
      case 8:
        this.removeLastTag()
        break;
      case 13:
        this.addTag(event.target.value)
        break;
    }
    // if (event.key === 'Enter') {
    //   this.addTag(event.target.value)
    // } else if (event.keyCode) {
    // }
  },
  handleChange(event) {
    this.setState({ inputValue: event.target.value })
  },
  render() {
    const tags = this.state.tags.map((tag) => {
      return (
        <div
          className="tag"
          key={ tag }
        >
          { tag }
        </div>
      )
    })

    return (
      <div className="tags-editor">
        <div className="tags-list">
          { tags }
        </div>
        <input
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
          value={ this.state.inputValue }
        />
      </div>
    )
  }
})


export default TagsEditor
