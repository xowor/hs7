import { connect } from 'react-redux'
import { search } from '../../actions/searchActions'
import { closeSearchDialog, openSearchDialog } from '../../actions/uiActions'

import SearchDialog from '../presentationals/SearchDialog'


const mapStateToProps = (state) => {
  return {
    searchDialog: state.ui.searchDialog,
    results: state.search.results.results,
    searchRequest: state.search.results.request
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (query) => {
      dispatch(search(query))
    },
    closeSearchDialog: () => {
      dispatch(closeSearchDialog())
    },
    openSearchDialog: () => {
      dispatch(openSearchDialog())
    }
  }
}


const ConnectedSearchDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDialog)


export default ConnectedSearchDialog
