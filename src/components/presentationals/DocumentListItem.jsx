import React from 'react'
import Tag from './Tag'


const DocumentListItem = React.createClass({
  propTypes: {
    // createEmptyDocument: React.PropTypes.func,
    document: React.PropTypes.shape({
      _id: React.PropTypes.string,
      docType: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      synopsis: React.PropTypes.string,
      content: React.PropTypes.string.isRequired,
      tags: React.PropTypes.array.isRequired
    }).isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  // shouldComponentUpdate() {
  //   return false
  // },
  handleClick() {
    this.props.onClick(this.props.document._id)
  },
  render() {
    const doc = this.props.document
    const tagsList = this.props.document.tags.map((tag) => {
      return (
        <Tag
          key={ tag }
          tag={ tag }
        />
      )
    })

    return (
      <div
        className="documents-list-item"
        onClick={ this.handleClick }
      >
        <i
          aria-hidden="true"
          className="fa fa-2x fa-fw fa-file-text-o"
        />
        <div className="documents-list-item-content">
          <div className="title">{ doc.title }</div>
          <div className="synopsis">{ doc.synopsis }</div>
          <div>
            { tagsList }
          </div>
        </div>
      </div>
    )
  }
})


export default DocumentListItem
