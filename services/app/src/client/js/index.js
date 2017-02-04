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
  // log.debug('getFinalReducer', applicationReducers)

  return combineReducers({
    Application: applicationReducers,
    form: reduxFormReducer,
    apollo: apolloClient.reducer(),
  })
}

function getApplicationModule() {
  const application = require('./application').default

  // log.debug('getApplicationModule application', application)

  return new Module(application)
}

let store
function getStoreWithReducers(reducers) {
  // log.debug('getStoreWithReducers', reducers)

  if (store) {
    // If it exists, update the reducers
    store.replaceReducer(reducers)
  } else {
    // Otherwise create one.
    store = createStore(reducers, middleware)
  }

  return store
}

// Hot Module Reloading.
function renderApplication() {
  // log.debug('rerender')

  const ApplicationContainer = require('./ApplicationContainer').default

  const applicationModule = getApplicationModule()
  // log.debug('rerender applicationModule', applicationModule)
  // log.debug('rerender applicationModule.reducers', applicationModule.reducers)

  const reducers = getFinalReducer(applicationModule.reducers)
  // log.debug('rerender getFinalReducer', getFinalReducer)

  const store = getStoreWithReducers(reducers)
  // log.debug('rerender getStoreWithReducers', getStoreWithReducers)

  // Deep set the store into all modules for easy access.
  applicationModule.store = store
  // log.debug('rerender applicationModule.store', applicationModule.store)

  render(
    <AppContainer>
      <ApplicationContainer
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
    // log.debug('App changed')
    renderApplication()
  })

  module.hot.accept('./application', () => {
    // log.debug('application changed')
    renderApplication()
  })
}

// Initial run.
renderApplication()
