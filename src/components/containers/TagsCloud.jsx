import { connect } from 'react-redux'
import { readTags } from '../../actions/tagActions'

import TagsCloud from '../presentationals/TagsCloud'


const mapStateToProps = (state) => {
  return {
    tags: state.tags.tags.tags || [],
    tagsRequest: state.tags.tags.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readTags: () => {
      dispatch(readTags())
    }
  }
}


const ConnectedTagsCloud = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsCloud)


export default ConnectedTagsCloud
