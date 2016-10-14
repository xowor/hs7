import { connect } from 'react-redux'
import { readTopic } from '../../actions/topicActions'

import Topic from '../presentationals/Topic'


const mapStateToProps = (state) => {
  return {
    topic: state.topics.topic.topic || { },
    documents: state.topics.topic.documents || [],
    documentsRequest: state.topics.topic.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readTopic: (id) => {
      dispatch(readTopic(id))
    }
  }
}


const ConnectedTopic = connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic)


export default ConnectedTopic
