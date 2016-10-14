import { connect } from 'react-redux'
import { readDocuments } from '../../actions/documentActions'

import DocumentsList from '../presentationals/DocumentsList'


const mapStateToProps = (state) => {
  return {
    documents: state.documents.documents.documents || [],
    documentsRequest: state.documents.documents.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readDocuments: () => {
      dispatch(readDocuments())
    }
  }
}


const ConnectedDocumentsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsList)


export default ConnectedDocumentsList
