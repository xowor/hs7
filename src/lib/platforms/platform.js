let _platform = {}

if (require && require('process') && require('process').versions['electron']) {
  _platform = require('./electron/platform.js');
}

export const platform = _platform
