import { startupSubLog } from '../../logger'

const fs = require('fs')
const path = require('path')


let config = {
  database: {

  }
}

const configFilePath = `${__dirname}/../../../../../config/config.json`

module.exports.read = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        config = Object.assign(config, JSON.parse(data))
        resolve(config)
      }
    })
  })
  .then(() => Promise.all([
    startupSubLog(`Remote database URL: ${config.database.url}`)
  ]))
}

module.exports.config = () => {
  return config
}
