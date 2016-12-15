import path from 'path'
import zlib from 'zlib'

import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import koaCompress from 'koa-compress'
import koaConvert from 'koa-convert'
import koaErrorHandler from 'koa-errorhandler'
import koaGraphql from 'koa-graphql'
import koaHelmet from 'koa-helmet'
import koaLogger from 'koa-logger'
import koaPassport from 'koa-passport'
import koaPing from 'koa-ping'
import koaResponseTime from 'koa-response-time'
import koaRouter from 'koa-router'
import koaSession from 'koa-generic-session'
import koaStatic from 'koa-static'

import graphqlTools from 'graphql-tools'

import graphqlSchema from '../common/graphql/schema'
import graphqlResolvers from '../common/graphql/resolvers'

const CWD  = path.resolve(__dirname)
const HOST = process.env.IP || '0.0.0.0'
const PORT = /*process.env.PORT ||*/ 3000
const ADDRESS = `http://${HOST}:${PORT}`

const router = koaRouter()
const app = new Koa()
app.keys = ['keyboardcat']

const _use = app.use
app.use = x => _use.call(app, koaConvert(x))

router
  .all('/graphql', koaConvert(koaGraphql({
    schema: graphqlTools.makeExecutableSchema({
      typeDefs: graphqlSchema,
      resolvers: graphqlResolvers,
    }),
    graphiql: true,
  })))

app
  .use(koaLogger())
  .use(koaErrorHandler())
  .use(koaHelmet())
  .use(koaResponseTime())
  .use(koaCompress({
    filter: (contentType) => /text/i.test(contentType),
    threshold: 2048,
    flush: zlib.Z_SYNC_FLUSH,
  }))
  .use(koaPing())

  .use(koaBodyparser())
  .use(koaSession())
  .use(koaPassport.initialize())
  .use(koaPassport.session())

  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaStatic(`${CWD}/../client`))

app
  .listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`)
  })
