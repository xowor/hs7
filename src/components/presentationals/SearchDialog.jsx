import React from 'react'

import MixedList from '../presentationals/MixedList';


const SearchInput = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    onCloseSearchDialog: React.PropTypes.func,
    onOpenSearchDialog: React.PropTypes.func,
    shown: React.PropTypes.bool
  },
  componentDidMount() {
    window.Mousetrap(this.input).bind(['command+enter', 'ctrl+enter'], () => {
      this.onToggleSearchDialog()
    })
  },
  onToggleSearchDialog() {
    if (!this.props.shown) {
      this.props.onOpenSearchDialog()
    } else if (this.props.shown) {
      this.props.onCloseSearchDialog()
    }
  },
  focus() {
    this.input.focus()
  },
  render() {
    return (
      <div id="search-dialog-input-box">
        <input
          onChange={ this.props.onChange }
          ref={ (node) => this.input = node }
        />
      </div>
    );
  }
})


const SearchDialog = React.createClass({
  propTypes: {
    closeSearchDialog: React.PropTypes.func,
    documents: React.PropTypes.arrayOf(React.PropTypes.shape()),
    documentsRequest: React.PropTypes.shape(),
    onSearch: React.PropTypes.func,
    openSearchDialog: React.PropTypes.func,
    searchDialog: React.PropTypes.shape({ open: React.PropTypes.bool })
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.searchRequest.pending) {
      return false
    }

    return true
  },
  componentDidMount() {
    this.props.onSearch('')
  },
  componentDidUpdate() {
    this.searchInput.focus()
  },
  handleSearch(event) {
    this.props.onSearch(event.target.value)
  },
  handleClose() {
    this.props.closeSearchDialog()
  },
  handleOpen() {
    this.props.openSearchDialog()
  },
  render() {
    let className = ''

    if (!this.props.searchDialog.open) {
      className += 'hidden'
    }

    return (
      <div
        className={ className }
        id="search-dialog"
      >
        <SearchInput
          onChange={ this.handleSearch }
          onCloseSearchDialog={ this.handleClose }
          onOpenSearchDialog={ this.handleOpen }
          ref={ (node) => this.searchInput = node }
          shown={ this.props.searchDialog.open }
        />
        <MixedList
          closeSearchDialog={ this.props.closeSearchDialog }
          results={ this.props.results || [] }
        />
      </div>
    )
  }
})


export default SearchDialog
