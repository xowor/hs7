import React from 'react'

const { remote } = require('electron')

const ElectronWindowButtons = React.createClass({
  render() {
    return (
      <div className="ext-electron-window-buttons">
        <button id="minimize" onClick={ () => remote.BrowserWindow.getFocusedWindow().minimize() }>
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
        <button id="maximize" onClick={ () => {
          const window = remote.getCurrentWindow();
          if (!window.isMaximized()) {
            window.maximize();
          } else {
            window.unmaximize();
          }
        }}>
          <i className="fa fa-square-o" aria-hidden="true"></i>
        </button>
        <button id="close" onClick={ () => remote.BrowserWindow.getFocusedWindow().close() }>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    )
    // }
  }
})


export default ElectronWindowButtons
