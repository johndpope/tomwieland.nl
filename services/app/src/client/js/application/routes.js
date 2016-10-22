import Link from 'react-router/Link'
import Match from 'react-router/Match'
import React from 'react'
import Router from 'react-router/HashRouter'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import apolloClient from '../apolloClient'

import About from './modules/Main/components/About'
import Contact from './modules/Main/components/Contact'
import Container from './modules/Main/components/Container'
import Home from './modules/Main/components/Home'
import Login from './modules/Main/components/Login'

export default (options) =>
  <ApolloProvider store={options.store} client={apolloClient}>
    <Provider store={options.store} key={options.key}>
      <Router>
        <div>
          {options.routes}
        </div>
      </Router>
    </Provider>
  </ApolloProvider>
