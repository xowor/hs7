import { connect } from 'react-redux'
import { createEmptyDocument } from '../../actions/documentActions'

import DocumentCreator from '../presentationals/DocumentCreator'


const mapStateToProps = (state) => {
  return {
    document: state.documents.document.document,
    documentRequest: state.documents.document.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEmptyDocument: (title) => {
      dispatch(createEmptyDocument(title))
    }
  }
}


const ConnectedDocumentCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentCreator)


export default ConnectedDocumentCreator
