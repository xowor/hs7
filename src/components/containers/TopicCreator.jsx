import { connect } from 'react-redux'
import { createTopic } from '../../actions/topicActions'

import TopicCreator from '../presentationals/TopicCreator'


const mapStateToProps = (state) => {
  return {
    topic: state.topics.topic.topic,
    topicRequest: state.topics.topic.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTopic: (title) => {
      dispatch(createTopic(title))
    }
  }
}


const ConnectedTopicCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicCreator)


export default ConnectedTopicCreator
