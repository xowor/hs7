import React from 'react'


const Filler = (props) =>
  <div className="filler">
    <p className="message">{ props.message}</p>
  </div>

Filler.propTypes = { message: React.PropTypes.string }

export default Filler
