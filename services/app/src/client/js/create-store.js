import loggerMiddleware from 'redux-logger'
import reduxPromise from 'redux-thunk'
import { persistState } from 'redux-devtools'
import { reducer as reduxFormReducer } from 'redux-form'

import { ApolloProvider } from 'react-apollo'

import apolloClient from './apolloClient'

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'

import DevTools from './library/components/DevTools'

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/)

  if (matches && matches.length > 0) {
    return matches[1]
  }

  return undefined
}

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

export default (reducers) => {
  return createStore(combineReducers({
    Application: reducers,
    form: reduxFormReducer,
    apollo: apolloClient.reducer(),
  }), middleware)
}
