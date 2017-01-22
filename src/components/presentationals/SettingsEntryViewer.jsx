import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Filler from '../presentationals/Filler'

import { hashHistory } from 'react-router'


import Scroller from './Scroller'

const SettingsEntryViewer = React.createClass({
  propTypes: {
    component: React.PropTypes.element
  },
  render() {
    let Component

    if (this.props.entry) {
      Component = this.props.entry.component
    } else {
      Component = Filler
    }

    return (
      <div className="settings-entry-viewer">
        <Component />
      </div>
    )
  }
})

export default SettingsEntryViewer
