import 'whatwg-fetch'

import React from 'react'
import log from 'loglevel'
import loggerMiddleware from 'redux-logger'
import reduxPromise from 'redux-thunk'
import { AppContainer } from 'react-hot-loader'
import { persistState } from 'redux-devtools'
import { reducer as reduxFormReducer } from 'redux-form'
import { render } from 'react-dom'

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'

import reactElementToJSXString from 'react-element-to-jsx-string'

import '../css/app.scss'

import App from './App'
import DevTools from './library/components/DevTools'
import apolloClient from './apolloClient'
import { getRoutes } from './library/module'
import application from './application'
import reducers from './reducers'

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

const middleware = getMiddleware()
const store = createStore(getFinalReducer(reducers), middleware)
const routes = getRoutes(application, store)

log.debug('routes', reactElementToJSXString(routes))

function reload() {
  const NextApp = require('./App').default
  const nextReducers = require('./reducers').default

  store.replaceReducer(getFinalReducer(nextReducers))

  renderApplication(NextApp, store, routes)
}

if (module.hot) {
  module.hot.accept('./App', reload)
  module.hot.accept('./application', reload)
  module.hot.accept('./reducers', reload)
}

renderApplication(App, store, routes)
