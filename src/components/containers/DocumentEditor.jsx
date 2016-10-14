
import { connect } from 'react-redux'
import {
  createEmptyDocument,
  createDocument,
  readDocument,
  updateDocument
} from '../../actions/documentActions'

import DocumentEditor from '../presentationals/DocumentEditor'


const mapStateToProps = (state) => {
  return {
    document: state.documents.document.document,
    documentRequest: state.documents.document.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEmptyDocument: () => {
      dispatch(createEmptyDocument())
    },
    createDocument: (doc) => {
      dispatch(createDocument(doc))
    },
    readDocument: (name) => {
      dispatch(readDocument(name))
    },
    updateDocument: (doc) => {
      dispatch(updateDocument(doc))
    }
  }
}


const ConnectedDocumentEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentEditor)


export default ConnectedDocumentEditor
