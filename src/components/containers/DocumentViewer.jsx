import { connect } from 'react-redux'
import {
  readDocument,
  removeDocument
} from '../../actions/documentActions'

import DocumentViewer from '../presentationals/DocumentViewer'


const mapStateToProps = (state) => {
  return {
    document: state.documents.document.document,
    documentRequest: state.documents.document.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readDocument: (id) => {
      dispatch(readDocument(id))
    },
    removeDocument: (doc) => {
      dispatch(removeDocument(doc))
    }
  }
}


const ConnectedDocumentViewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentViewer)


export default ConnectedDocumentViewer
