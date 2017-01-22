import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { hashHistory } from 'react-router'
import { Link } from 'react-router'

import SettingsEntryViewer from '../presentationals/SettingsEntryViewer'
import DocumentViewerEditorContainer from '../presentationals/DocumentViewerEditorContainer'
import Filler from '../presentationals/Filler'

import { platform } from '../../lib/platforms/platform'

let extensionsEntries = platform.extensions.components().settings.entries

const SettingsPage = React.createClass({
  shouldComponentUpdate() {
    if (window.location.hash.indexOf('/settings/') < 0) {
      return false
    }

    return true
  },
  render() {
    let extensionsEntriesNames = extensionsEntries.map((entry, i) => {
      const className = (this.props.params.id === entry.id) ? 'active' : ''
      return (
        <Link key={ i } to={ `/settings/${entry.id}` } className={ `${className} entries-list-item` }>
          { entry.name }
        </Link>
      )
    })

    const entry = extensionsEntries.filter((entry) => {
      return entry.id === this.props.params.id
    })[0]

    return (
      <div className="page-settings">
        <div className="content-left darker">
          <div className="entries-list">
            { extensionsEntriesNames }
          </div>
        </div>
        <div className="content-right">
          <SettingsEntryViewer entry={ entry } />
        </div>
      </div>
    )
  }
})

SettingsPage.propTypes = { children: React.PropTypes.element }

export default SettingsPage
