import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { HashRouter } from 'react-router'
import { Provider } from 'react-redux'

import apolloClient from '../apolloClient'

export default options =>
  <ApolloProvider store={options.store} client={apolloClient}>
    <Provider store={options.store} key={options.key}>
      <HashRouter>
        <div>
          {options.routes}
        </div>
      </HashRouter>
    </Provider>
  </ApolloProvider>
