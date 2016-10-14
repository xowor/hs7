import React from 'react'

import ElectronWindowButtons from './lib/ElectronWindowButtons'

export const manifest = {
  'name': 'ElectronWindowButtons',
  'platforms': ['electron']
}

export const components = {
  navbar: {
    beforeButtons: [
      ElectronWindowButtons
    ],
    buttons: [],
    afterButtons: []
  }
}
