import React from 'react'

import DocumentListItem from '../presentationals/DocumentListItem';

import { push } from 'react-router-redux';


const DocumentsList = React.createClass({
  componentWillMount() {
    this.props.readDocuments()
  },
  // componentDidMount() {
  //   if (this.refs['iframe']) {
  //     console.log('iframe');
  //   } else {
  //     console.log('aaa');
  //   }
  // },
  //
  // openDocument(id) {
    // this.props.navigate(push('/documents/' + id));
  // },
  //
  shouldComponentUpdate(nextProps) {
    if (nextProps.documentsRequest && nextProps.documentsRequest.pending) {
      return false
    }
    return true
  },
  render() {
    const documents = this.props.documents
    let docs = []
    for (var i = 0; i < documents.length; i++) {
      docs.push(
        <DocumentListItem
          key={i}
          document={documents[i]}
          onClick={this.props.onSelect}
        />
      )
    }
    return (
      <div className="documents-list">
        { docs }
      </div>
    )
  }
})


export default DocumentsList
