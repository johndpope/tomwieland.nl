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

import App from './App'
import DevTools from './library/components/DevTools'
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

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/)

  if (matches && matches.length > 0) {
    return matches[1]
  }

  return undefined
}

function getMiddleware() {
  let middleware = [
    reduxPromise,
    apolloClient.middleware(),
    loggerMiddleware({
      collapsed: true,
    }),
  ]

  if (window.devToolsExtension) {
    middleware = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension(),
      persistState(getDebugSessionKey())
    )
  } else {
    middleware = compose(
      applyMiddleware(...middleware),
      DevTools.instrument(),
      persistState(getDebugSessionKey())
    )
  }

  return middleware
}

function getFinalReducer(applicationReducers) {
  return combineReducers({
    Application: applicationReducers,
    form: reduxFormReducer,
    apollo: apolloClient.reducer(),
  })
}

function renderApplication(App, store, routes) {
  render(
    <AppContainer>
      <App
        store={store}
        routes={routes}
      />
    </AppContainer>,
    document.querySelector('#root')
  )
}

console.log('APPLICATION', JSON.stringify(application))

const module = new Module(application)
module.store = createStore(getFinalReducer(module.reducers), getMiddleware())

function reload() {
  const NextApp = require('./App').default

  module.store.replaceReducer(getFinalReducer(module.reducers))

  renderApplication(NextApp, module.store, module.routes)
}

if (module.hot) {
  module.hot.accept('./App', reload)
  module.hot.accept('./application', reload)
  module.hot.accept('./reducers', reload)
}

renderApplication(App, module.store, module.routes)
