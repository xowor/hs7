const fs = require('fs')
const path = require('path')

let config = { }
const configFilePath = `${__dirname}/../../../../../config/config.json`

module.exports.read = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        config = JSON.parse(data)
        console.log(config);
        resolve(config)
      }
    })
  })
}

module.exports.config = () => {
  return config
}
