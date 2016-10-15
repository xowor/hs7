import { platform } from '../platforms/platform'

export const readDocumentMiddleware = (doc) => {
  for (var i = 0; i < platform.extensions.middlewares().document.read.length; i++) {
    doc = platform.extensions.middlewares().document.read[i](doc)
  }

  return doc
}

export const writeDocumentMiddleware = (doc) => {
  for (var i = 0; i < platform.extensions.middlewares().document.write.length; i++) {
    doc = platform.extensions.middlewares().document.write[i](doc)
  }

  return doc
}
