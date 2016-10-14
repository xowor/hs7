import React from 'react'


const TopicListItem = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func,
    topic: React.PropTypes.shape()
  },
  shouldComponentUpdate() {
    return false
  },
  handleClick() {
    this.props.onSelect(this.props.topic._id)
  },
  render() {
    const topic = this.props.topic

    return (
      <div
        className="topics-list-item"
        onClick={ this.handleClick }
      >
        <i
          aria-hidden="true"
          className={ `fa fa-fw fa-${topic.faClass}` }
        />
        <div className="topics-list-item-content">
          <div className="title">{ topic.title }</div>
        </div>
      </div>
    )
  }
})


export default TopicListItem
