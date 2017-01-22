import React from 'react'

import { exExporterWatchTest } from './lib/sagas/exporterSagas'
import { exporterReducer } from './lib/reducers/exporterReducer'

import ExporterSettingsEntry from './lib/ExporterSettingsEntry'

export const manifest = {
  'name': 'Exporter',
  'platforms': ['electron']
}

export const components = {
  navbar: {
    beforeButtons: [],
    buttons: [],
    afterButtons: []
  },
  settings: {
    entries: [{
      id: 'exporter',
      name: 'Exporter',
      component: ExporterSettingsEntry
    }]
  }
}

export const sagas = [
  exExporterWatchTest()
]

export const reducer = exporterReducer
