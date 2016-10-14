import { connect } from 'react-redux'
import { closeSearchDialog, openSearchDialog } from '../../actions/uiActions'

import Navbar from '../presentationals/Navbar'


const mapStateToProps = (state) => {
  return { searchDialog: state.ui.searchDialog }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeSearchDialog: () => {
      dispatch(closeSearchDialog())
    },
    openSearchDialog: () => {
      dispatch(openSearchDialog())
    }
  }
}


const ConnectedNavbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)


export default ConnectedNavbar
