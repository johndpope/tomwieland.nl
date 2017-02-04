import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import apolloClient from '../apolloClient'

export default (options) => {
  return (
    <ApolloProvider store={options.store} client={apolloClient}>
      <Provider store={options.store} key={options.key}>
        <BrowserRouter>
          <div>
            {options.routes}
          </div>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  )
}
