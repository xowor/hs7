import React from 'react'

import { hashHistory } from 'react-router'

import { DOCUMENT_TITLE_LENGTH_MAX } from '../../config'


// const TypeEntry = React.createClass({
//   propTypes: {
//     enabled: React.PropTypes.bool,
//     icon: React.PropTypes.string,
//     name: React.PropTypes.string,
//     onClick: React.PropTypes.func,
//     type: React.PropTypes.string
//   },
//   handleClick(event) {
//     this.props.onClick(event, this.props.type)
//   },
//   render() {
//     return (
//       <div
//         className={ this.props.enabled }
//         onClick={ this.handleClick }
//       >
//         <i
//           aria-hidden="true"
//           className={ `fa fa-fw fa-${this.props.icon}` }
//         />
//         { this.props.name }
//       </div>
//     )
//   }
// })


const TopicCreator = React.createClass({
  propTypes: {
    createTopic: React.PropTypes.func,
    topicRequest: React.PropTypes.shape({
      action: React.PropTypes.string,
      pending: React.PropTypes.string.bool
    })
  },
  getInitialState() {
    return { title: '' }
  },
  // componentWillMount() {
  // if (this.props.params.id === 'new') {
  //   this.props.createEmptyDocument()
  // } else {
  //   this.props.readDocument(this.props.params.id)
  // }
  // },
  // componentDidMount() {
  //   if (this.refs['iframe']) {
  //     console.log('iframe');
  //   } else {
  //     console.log('aaa');
  //   }
  // },
  componentWillReceiveProps(nextProps) {
    if (this.props.topicRequest.action === 'create') {
      if (this.props.topicRequest.pending &&
        !nextProps.topicRequest.pending) {
          console.log(nextProps)
        hashHistory.push(`/topics/${nextProps.topic._id}`)
      }
    }
  },
  // componentDidUpdate(nextProps) {
  //   if (nextProps.params.id != this.props.params.id) {
  //     // console.log(this.props.params.id);
  //     this.props.readDocument(this.props.params.id)
  //   }
  // },
  handleUpdateTitle(events) {
    const title = events.target.value

    if (title.length <= DOCUMENT_TITLE_LENGTH_MAX) {
      this.setState({ title })
    }
  },
  handleCreate() {
    this.props.createTopic(this.state.title)
  },
  render() {
    return (
      <div className="topic-creator">
        <h2>{ 'Create new topic' }</h2>
        <div>
          <input
            autoFocus
            className="title"
            key="title"
            onChange={ this.handleUpdateTitle }
            placeholder="Topic title"
            value={ this.state.title }
          />
        </div>
        <div>
          <button onClick={ this.handleCreate }>
            <i
              aria-hidden="true"
              className="fa fa-fw fa-check-circle-o"
            />
            { 'Create' }
          </button>
        </div>
      </div>
    )
  }
})


export default TopicCreator
