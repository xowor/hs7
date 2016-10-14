import React from 'react'

import { exExporterWatchTest } from './lib/sagas/exporterSagas'
import { exporterReducer } from './lib/reducers/exporterReducer'

export const manifest = {
  'name': 'Exporter',
  'platforms': ['electron']
}

export const components = {
  navbar: {
    beforeButtons: [],
    buttons: [],
    afterButtons: []
  }
}

export const sagas = [
  exExporterWatchTest()
]

export const reducer = exporterReducer
