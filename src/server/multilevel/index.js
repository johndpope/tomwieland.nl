import fs from 'fs'
import net from 'net'
import path from 'path'

import level from 'level'
import levelgraph from 'levelgraph'
import levelgraphN3 from 'levelgraph-n3'
import log from 'loglevel'
import multilevel from 'multilevel'

import fixtures from './fixtures.json'

const LOGLEVEL = process.env.LOGLEVEL || 'debug'
const DBPATH = process.env.DBPATH || path.resolve(__dirname, '../../../.tmp/data')
const PORT = +process.env.PORT || 3001

log.info(`Setting log level to "${LOGLEVEL}".`)
log.setLevel(LOGLEVEL)

const levelDb = level(DBPATH)
const levelgraphDb = levelgraphN3(levelgraph(levelDb))

// Add methods for the manifest.
levelgraphDb.methods = {
  createKeyStream: { type: 'readable' },
  createReadStream: { type: 'readable' },
  createValueStream: { type: 'readable' },
  keyStream: { type: 'readable' },
  readStream: { type: 'readable' },
  searchStream: { type: 'readable' },
  valueStream: { type: 'readable' },

  putStream: { type: 'writable' },

  generateBatch: { type: 'sync' },
  isClosed: { type: 'sync' },
  isOpen: { type: 'sync' },
  v: { type: 'sync' },

  approximateSize: { type: 'async' },
  batch: { type: 'async' },
  del: { type: 'async' },
  get: { type: 'async' },
  nav: { type: 'async' },
  put: { type: 'async' },
  search: { type: 'async' },
}

const multilevelServer = multilevel.server(levelgraphDb)

const manifestPath = path.resolve(__dirname, '../../manifest.json')

log.info(`Writing manifest file to ${manifestPath}.`)

multilevel.writeManifest(levelgraphDb, manifestPath)

const server = net.createServer((connection) => {
  connection
    .pipe(multilevelServer)
    .pipe(connection)
})

function importFixtures(cb) {
  const stream = fs
    .createReadStream('./fixtures.n3')
    .pipe(levelgraphDb.n3.putStream())

  stream.on('finish', cb)
  stream.on('error', cb)
}

server.listen(PORT, (error) => {
  log.info(`Multilevel server running at tcp://0.0.0.0:${PORT}.`)

  const manifest = require(manifestPath)
  const multilevelClient = multilevel.client(manifest)
  const multilevelClientRPCStream = multilevelClient.createRpcStream()
  const multilevelClientConnection = net.connect(PORT)

  multilevelClientConnection
    .pipe(multilevelClientRPCStream)
    .pipe(multilevelClientConnection)

  /*
  multilevelClient.put(fixtures, (error) => {
    if (error) {
      throw error
    }

    multilevelClient.get(fixtures['@id'], { '@context': fixtures['@context'] }, (error, result) => {
      if (error) {
        throw error
      }

      log.debug('Get result:', result)

      multilevelClient.del(fixtures['@id'], (error) => {
        if (error) {
          throw error
        }

        log.info('Done.')
      })
    })
  })
  */

  console.log(0)

  multilevelClient.get({ subject: 'FIXTURES_LOADED' }, (error, result) => {
    if (error) {
      throw error
    }

    if (result) {
      return
    }

    importFixtures((error) => {
      if (error) {
        throw error
      }
    })
  })
})
