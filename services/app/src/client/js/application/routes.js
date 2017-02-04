import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import apolloClient from '../apolloClient'

export default (options) => {
  return (
    <ApolloProvider store={options.store} client={apolloClient}>
      <Provider store={options.store} key={options.key}>
        <Router>
          <div>
            {options.routes}
          </div>
        </Router>
      </Provider>
    </ApolloProvider>
  )
}
