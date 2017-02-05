import path from 'path'
import zlib from 'zlib'

import Koa from 'koa'
import graphqlTools from 'graphql-tools'
import koaBodyparser from 'koa-bodyparser'
import koaCompress from 'koa-compress'
import koaConvert from 'koa-convert'
import koaErrorHandler from 'koa-errorhandler'
import koaGraphql from 'koa-graphql'
import koaHelmet from 'koa-helmet'
import koaHistoryAPIFallback from 'koa-history-api-fallback'
import koaLogger from 'koa-logger'
import koaPassport from 'koa-passport'
import koaPing from 'koa-ping'
import koaResponseTime from 'koa-response-time'
import koaRouter from 'koa-router'
import koaSession from 'koa-generic-session'
import koaStatic from 'koa-static'
import log from 'loglevel'
import webpack from 'webpack'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'

// Import this first.
import db from './database'

import webpackConfig from '../../webpack.config'
import graphqlSchema from './graphql/schema'
import graphqlResolvers from './graphql/resolvers'

if (process.env.NODE_ENV === 'develop') {
  log.setLevel('debug')
}

const CWD = path.resolve(__dirname)
const HOSTNAME = process.env.IP || '0.0.0.0'
const PORT = process.env.PORT || 3000
const ADDRESS = `http://${HOSTNAME}:${PORT}`

const router = koaRouter()
const app = new Koa()
app.keys = ['keyboardcat']

// Hook to convert old Koa.js middleware
const oldUse = app.use
app.use = x => oldUse.call(app, koaConvert(x))



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
    filter: contentType => /text/i.test(contentType),
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
  .use(koaHistoryAPIFallback())
  .use(koaStatic(`${CWD}/../client`))

if (process.env.NODE_ENV === 'develop') {
  webpackConfig.entry = ['react-hot-loader/patch']
    .concat(webpackConfig.entry)
    .concat(['webpack-hot-middleware/client'])

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ])

  const webpackCompiler = webpack(webpackConfig)

  app
    .use(webpackDevMiddleware(webpackCompiler, {
      reload: true,
      noInfo: true,
      quiet: false,
      lazy: false,
      stats: {
        colors: true,
      },
      publicPath: '/',
    }))
    .use(webpackHotMiddleware(webpackCompiler))
}

async function start() {
  try {
    log.info('Running migrations...')

    await db.migrate.latest()

    log.info('Migrations complete.')

    log.info('Running seed...')

    await db.seed.run()

    log.info('Seed complete.')

    log.info('Starting HTTP Server...')

    await app.listen(PORT, HOSTNAME)

    log.info(`HTTP Server listening at http://${HOSTNAME}:${PORT}`)
  } catch (error) {
    log.error(error)
    process.exit()
  }
}

start()
