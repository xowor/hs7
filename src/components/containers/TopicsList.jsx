import { connect } from 'react-redux'
import { readTopics } from '../../actions/topicActions'

import TopicsList from '../presentationals/TopicsList'


const mapStateToProps = (state) => {
  return {
    topics: state.topics.topics.topics || [],
    topicsRequest: state.topics.topics.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readTopics: () => {
      dispatch(readTopics())
    }
  }
}


const ConnectedTopicsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicsList)


export default ConnectedTopicsList
