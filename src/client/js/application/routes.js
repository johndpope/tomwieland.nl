import React from 'react'
import Router from 'react-router/HashRouter'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import apolloClient from '../apolloClient'

export default options =>
  <ApolloProvider store={options.store} client={apolloClient}>
    <Provider store={options.store} key={options.key}>
      <Router>
        <div>
          {options.routes}
        </div>
      </Router>
    </Provider>
  </ApolloProvider>
