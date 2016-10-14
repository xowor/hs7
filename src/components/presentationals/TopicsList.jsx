import React from 'react'
import { Link } from 'react-router'


import TopicListItem from '../presentationals/TopicListItem';


const TopicsList = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func,
    readTopics: React.PropTypes.func,
    topics: React.PropTypes.arrayOf(React.PropTypes.shape())
  },
  getInitialState() {
    return { filter: '' }
  },
  componentWillMount() {
    this.props.readTopics()
  },
  // componentDidMount() {
  //   if (this.refs['iframe']) {
  //     console.log('iframe');
  //   } else {
  //     console.log('aaa');
  //   }
  // },
  //
  // openTopic(id) {
    // this.props.navigate(push('/topics/' + id));
  // },
  //
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.topicsRequest.pending) {
  //     return false
  //   }
  //   return true
  // },
  handleFilterChange(event) {
    this.setState({ filter: event.target.value })
  },
  render() {
    const topics = this.props.topics
    const topicsElements = []

    // console.log(this.state.filter);
    for (let i = 0; i < topics.length; i++) {
      // console.log(topics[i].title);
      // console.log(topics[i].title.indexOf(this.state.filter));
      if (topics[i].title.indexOf(this.state.filter) >= 0) {
        topicsElements.push(
          <TopicListItem
            key={ i }
            onSelect={ this.props.onSelect }
            topic={ topics[i] }
          />
        )
      }
    }

    return (
      <div className="topics-list">
        <div className="filter">
          <i
            aria-hidden="true"
            className="fa fa-search"
          />
          <input
            className="filter"
            onChange={ this.handleFilterChange }
            placeholder="Filter topics..."
            value={ this.state.filter }
          />
        </div>
        <div className="items">
          { topicsElements }
        </div>
        <div className="bottom-bar">
          <Link to="/topics/new">
            <button>
              <i
                aria-hidden="true"
                className="fa fa-plus-circle"
              />
            </button>
          </Link>
        </div>
      </div>
    )
  }
})


export default TopicsList
