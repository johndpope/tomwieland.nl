import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface('/graphql')

const client = new ApolloClient({
  networkInterface,
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    req.options.headers.authorization = localStorage.getItem('token') || null

    next()
  },
}])

export default client
