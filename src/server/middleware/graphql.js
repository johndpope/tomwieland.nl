import bodyParser from 'body-parser'
import { makeExecutableSchema } from 'graphql-tools'

import {
  apolloExpress,
  graphiqlExpress,
} from 'apollo-server'

import Schema from '../../common/graphql/schema'
import Resolvers from '../../common/graphql/resolvers'

export default (app, cb) => {
  const schema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers(app),
  })

  app.use('/graphql',
    bodyParser.json(),
    apolloExpress({
      schema,
      context: {},
    })
  )

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  cb()
}
