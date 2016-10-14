import React from 'react'
// import { Link } from 'react-router'


const Tag = ({ tag }) =>
  <span
    className="tag"
    key={ tag }
  >
    { tag }
  </span>

Tag.propTypes = { tag: React.PropTypes.string };
Tag.defaultProps = { tag: 'tag' };


export default Tag
