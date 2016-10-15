const fs = require('fs')
const path = require('path')

const extRoot = `${__dirname}/../../../../extensions`

const extensionManager = {
  extensions: [],
  extensionsManifests: [],
  components: {
    navbar: {
      beforeButtons: [],
      buttons: [],
      afterButtons: []
    }
  },
  sagas: [],
  reducers: [],
  middlewares: {
    document: {
      read: [],
      write: []
    }
  }
}


module.exports.load = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(extRoot, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
    .then((files) => {
      return Promise.all(files.map((file) => {
        if (file !== '.' && file !== '..') {
          const filePath = `${extRoot}/${file}`

          return new Promise((resolve, reject) => {
            fs.stat(filePath, (err, stat) => {
              if (err) {
                reject(err)
              } else if (stat.isDirectory()) {
                resolve(path.normalize(filePath))
              } else {
                resolve(null)
              }
            })
          })
        }

        return null
      }))
    })
    .then((dirs) => {
      return dirs.filter((dir) => { return !!dir })
    })
    .then((dirs) => {
      console.log(dirs);
      return Promise.all(dirs.map((dir) => {
        return new Promise((resolve, reject) => {
          let ext = null

          try {
            ext = require(`${dir}/index.js`)
          } catch (err) {
            reject(err)
          }
          resolve({
            name: dir.substr(dir.lastIndexOf('/') + 1, dir.length),
            extension: ext
          })
        })
          .catch((err) => {
            console.error(`Failed loading extension "${dir}": ${err}`)
            throw err
          })
      }))
        .then((extensions) => {
          return extensions.filter((ext) => { return !!ext })
        })
    })
    .then((extensions) => {
      for (let i = 0; i < extensions.length; i++) {
        extensionManager.extensions.push(extensions[i])
        extensionManager.extensionsManifests.push(extensions[i].extension.manifest)
      }
    })
    .then(() => {
      for (let i = 0; i < extensionManager.extensions.length; i++) {
        console.log(extensionManager.extensions[i]);
        if (extensionManager.extensions[i].extension.components) {
          extensionManager.components.navbar.beforeButtons = extensionManager.components.navbar.beforeButtons.concat(extensionManager.extensions[i].extension.components.navbar.beforeButtons || [])
          extensionManager.components.navbar.buttons = extensionManager.components.navbar.buttons.concat(extensionManager.extensions[i].extension.components.navbar.buttons || [])
          extensionManager.components.navbar.afterButtons = extensionManager.components.navbar.afterButtons.concat(extensionManager.extensions[i].extension.components.navbar.afterButtons || [])
        }
        if (extensionManager.extensions[i].extension.sagas) {
          extensionManager.sagas = extensionManager.sagas.concat(extensionManager.extensions[i].extension.sagas)
        }
        if (extensionManager.extensions[i].extension.reducer) {
          extensionManager.reducers[`ext_${extensionManager.extensions[i].name}`] = extensionManager.extensions[i].extension.reducer
        }
        if (extensionManager.extensions[i].extension.middlewares) {
          extensionManager.middlewares.document.read = extensionManager.middlewares.document.read.concat(extensionManager.extensions[i].extension.middlewares.document.read || [])
          extensionManager.middlewares.document.write = extensionManager.middlewares.document.write.concat(extensionManager.extensions[i].extension.middlewares.document.write || [])
        }
      }
    })
    .then(() => console.log(extensionManager))
}

module.exports.components = () => {
  return extensionManager.components
}

module.exports.sagas = () => {
  return extensionManager.sagas
}

module.exports.reducers = () => {
  return extensionManager.reducers
}

module.exports.middlewares = () => {
  return extensionManager.middlewares
}
