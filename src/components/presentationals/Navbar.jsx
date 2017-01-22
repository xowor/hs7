import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { platform } from '../../lib/platforms/platform'

// console.log(platform.extensions.components().navbar);
const beforeButtons = platform.extensions.components().navbar.beforeButtons.map((Component, i) => {
  return (
    <Component key={ i } />
  )
})
// console.log(beforeButtons);

const Navbar = (props) =>
  <div id="navbar">
    { beforeButtons }
    <Link to="/documents/">
      <div className="navbar-entry">
        <i
          aria-hidden="true"
          className="fa fa-fw fa-file-text-o"
        />
      </div>
    </Link>
    <Link to="/topics/">
      <div className="navbar-entry">
        <i
          aria-hidden="true"
          className="fa fa-bookmark"
        />
      </div>
    </Link>
    <Link to="/tags/">
      <div className="navbar-entry">
        <i
          aria-hidden="true"
          className="fa fa-fw fa-tags"
        />
      </div>
    </Link>
    <Link to="/database/">
      <div className="navbar-entry">
        <i
          aria-hidden="true"
          className="fa fa-fw fa-database"
        />
      </div>
    </Link>
    <Link to="/settings/">
      <div className="navbar-entry">
        <i
          aria-hidden="true"
          className="fa fa-fw fa-gear"
        />
      </div>
    </Link>
    <div
      className="navbar-entry"
      onClick={ () => {
        if (props.searchDialog.open === true) {
          props.closeSearchDialog()
        } else {
          props.openSearchDialog()
        } }
      }
    >
      <i
        aria-hidden="true"
        className="fa fa-fw fa-search"
      />
    </div>
    <Link to="/document/new">
      <div className="navbar-entry">
        <i
          aria-hidden="true"
          className="fa fa-fw fa-plus-circle"
        />
      </div>
    </Link>
  </div>


// const mapStateToProps = () => { }

// const mapDispatchToProps = (dispatch) => {
//   return {  }
// }

const ConnectedNavbar = connect(
  null,
  null
)(Navbar)

export default ConnectedNavbar
