import { startupSubLog } from '../logger'

let _platform = {}

if (require && require('process') && require('process').versions['electron']) {
  startupSubLog(`Detected Electron v${require('process').versions['electron']} platform`)
  _platform = require('./electron/platform.js');
}

export const platform = _platform
