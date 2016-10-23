import 'whatwg-fetch'

import React from 'react'
import loggerMiddleware from 'redux-logger'
import reduxPromise from 'redux-thunk'
import { ApolloProvider } from 'react-apollo'
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

// import reactElementToJSXString from 'react-element-to-jsx-string'
// console.log('routes', reactElementToJSXString(routes))

import App from './App'
import DevTools from './library/components/DevTools'
import apolloClient from './apolloClient'
import { getReducers, getRoutes } from './library/module'
import application from './application'
import reducers from './reducers'

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

function getFinalReducers(applicationReducers) {
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

const store = createStore(getFinalReducers(reducers), getMiddleware())
const routes = getRoutes(application, store)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default

    renderApplication(NextApp, store, routes)
  })

  module.hot.accept('./reducers', () => {
    const nextReducers = require('./reducers')

    store.replaceReducer(getFinalReducers(nextReducers))
  })
}

renderApplication(App, store, routes)
