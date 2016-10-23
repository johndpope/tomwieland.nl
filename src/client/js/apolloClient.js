import ApolloClient, { createNetworkInterface } from 'apollo-client'

export default new ApolloClient({
  networkInterface: createNetworkInterface('/graphql'),
})
