import 'whatwg-fetch'

import React from 'react'
import log from 'loglevel'
import loggerMiddleware from 'redux-logger'
import reduxPromise from 'redux-thunk'
import { AppContainer } from 'react-hot-loader'
import { Module } from 'id-redux-modules'
import { persistState } from 'redux-devtools'
import { reducer as reduxFormReducer } from 'redux-form'
import { render } from 'react-dom'

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'

import '../css/app.scss'

import apolloClient from './apolloClient'
import application from './application'

// Dependencies
// Use require to force synchronous loading
window.jQuery = window.$ = require('jquery/dist/jquery.min')
window.Tether = require('tether')

// Bootstrap js.
require('bootstrap/js/src/alert')
require('bootstrap/js/src/button')
require('bootstrap/js/src/carousel')
require('bootstrap/js/src/collapse')
require('bootstrap/js/src/dropdown')
require('bootstrap/js/src/modal')
require('bootstrap/js/src/popover')
require('bootstrap/js/src/scrollspy')
require('bootstrap/js/src/tab')
require('bootstrap/js/src/tooltip')
require('bootstrap/js/src/util')

const middleware = compose(applyMiddleware(
  reduxPromise,
  apolloClient.middleware(),
  loggerMiddleware({
    collapsed: true,
  }),
))

function getFinalReducer(applicationReducers) {
  return combineReducers({
    Application: applicationReducers,
    form: reduxFormReducer,
    apollo: apolloClient.reducer(),
  })
}

function getApplicationModule() {
  const application = require('./application').default

  return new Module(application)
}

// Only create this once to keep state.
const store = createStore(getFinalReducer(getApplicationModule().reducers), middleware)

// Hot Module Reloading.
function rerender() {
  const App = require('./App').default
  const application = require('./application').default

  const applicationModule = getApplicationModule()

  // Deep set the store into all modules for easy access.
  applicationModule.store = store

  applicationModule.store.replaceReducer(getFinalReducer(applicationModule.reducers))

  render(
    <AppContainer>
      <App
        store={applicationModule.store}
        routes={applicationModule.routes}
      />
    </AppContainer>,
    document.querySelector('#root')
  )
}

if (module.hot) {
  // Accept hot reloads from these paths.
  module.hot.accept('./App', () => {
    log.debug('App changed')
    rerender()
  })
  module.hot.accept('./application', () => {
    log.debug('application changed')
    rerender()
  })
}

// Initial run.
rerender()
