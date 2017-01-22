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
import koaLogger from 'koa-logger'
import koaPassport from 'koa-passport'
import koaPing from 'koa-ping'
import koaResponseTime from 'koa-response-time'
import koaRouter from 'koa-router'
import koaSession from 'koa-generic-session'
import koaStatic from 'koa-static'
import webpack from 'webpack'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'

// Start a MultiLevel server with LevelGraph. Import this before GraphQL.
import './multilevel'

import webpackConfig from '../../webpack.config'
import graphqlSchema from '../common/graphql/schema'
import graphqlResolvers from '../common/graphql/resolvers'

const CWD  = path.resolve(__dirname)
const HOST = process.env.IP || '0.0.0.0'
const PORT = process.env.PORT || 3000
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

if (process.env.NODE_ENV === 'develop') {
  webpackConfig.entry = ['react-hot-loader/patch']
    .concat(webpackConfig.entry)
    .concat(['webpack-hot-middleware/client'])

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])

  // console.log('webpackConfig', JSON.stringify(webpackConfig))

  const webpackCompiler = webpack(webpackConfig)

  app
    .use(webpackDevMiddleware(webpackCompiler, {
      reload: true,
      noInfo: true,
      quiet: true,
      publicPath: '/',
    }))
    .use(webpackHotMiddleware(webpackCompiler))
}

app
  .listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`)
  })
