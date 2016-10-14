import { connect } from 'react-redux'
import { readTag } from '../../actions/tagActions'

import TagDocuments from '../presentationals/TagDocuments'


const mapStateToProps = (state) => {
  return {
    tag: state.tags.tag || { },
    documents: state.tags.tag.documents || [],
    documentsRequest: state.tags.tag.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readTag: (id) => {
      dispatch(readTag(id))
    }
  }
}


const ConnectedTagDocuments = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagDocuments)


export default ConnectedTagDocuments
