import React from 'react'
import { Link } from 'react-router'


const TagsCloud = React.createClass({
  // propTypes: {
  //   onSelect: React.PropTypes.func,
  //   readTags: React.PropTypes.func,
  //   tags: React.PropTypes.arrayOf(React.PropTypes.shape())
  // },
  getInitialState() {
    return { filter: '' }
  },
  componentWillMount() {
    this.props.readTags()
  },
  // componentDidMount() {
  //   if (this.refs['iframe']) {
  //     console.log('iframe');
  //   } else {
  //     console.log('aaa');
  //   }
  // },
  //
  // openTag(id) {
    // this.props.navigate(push('/tags/' + id));
  // },
  //
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.tagsRequest.pending) {
  //     return false
  //   }
  //   return true
  // },
  handleFilterChange(event) {
    this.setState({ filter: event.target.value })
  },
  render() {
    const tags = this.props.tags
    const tagsElements = []

    // console.log(this.state.filter);
    for (let i = 0; i < tags.length; i++) {
      // console.log(tags[i]);
      // console.log(tags[i].indexOf(this.state.filter));
      if (tags[i].indexOf(this.state.filter) >= 0) {
        tagsElements.push(
          <div
            className="tag"
            key={ tags[i] }
            onClick={ () => this.props.onSelect(tags[i]) }
          >
            { tags[i] }
          </div>
          // <TagsCloudItem
          //   key={ i }
          //   onSelect={ this.props.onSelect }
          //   tag={ tags[i] }
          // />
        )
      }
    }

    return (
      <div className="tags-cloud">
        <div className="filter">
          <i
            aria-hidden="true"
            className="fa fa-search"
          />
          <input
            className="filter"
            onChange={ this.handleFilterChange }
            placeholder="Filter tags..."
            value={ this.state.filter }
          />
        </div>
        <div className="items">
          { tagsElements }
        </div>
        {/* <div className="bottom-bar">
        </div> */}
      </div>
    )
  }
})


export default TagsCloud
