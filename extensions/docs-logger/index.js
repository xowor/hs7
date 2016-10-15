import React from 'react'


export const manifest = {
  'name': 'DocsLogger',
  'platforms': ['electron']
}

export const middlewares = {
  document: {
    read: [
      (doc) => {
        console.log('Reading document:')
        console.log(doc)
        return doc
      }
    ],
    write: [
      (doc) => {
        console.log('Writing document:')
        console.log(doc)
        return doc
      }]
  }
}
