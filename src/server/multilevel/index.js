import fs from 'fs'
import net from 'net'
import path from 'path'

import level from 'level-party'
import levelgraph from 'levelgraph'
import levelgraphN3 from 'levelgraph-n3'
import log from 'loglevel'
import multilevel from 'multilevel'

const LOGLEVEL = process.env.LOGLEVEL || 'debug'
const DBPATH = process.env.DBPATH || path.resolve(__dirname, '../../../.tmp/data')
const PORT = +process.env.PORT || 3001

log.info(`Setting log level to "${LOGLEVEL}".`)
log.setLevel(LOGLEVEL)

const levelDb = level(DBPATH)
const levelgraphDb = levelgraphN3(levelgraph(levelDb))

// Add methods for the manifest.
// TODO: Create a ticket in the proper package and get these exported from the package.
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

const manifestPath = path.resolve(__dirname, '../../manifest.json')
multilevel.writeManifest(levelgraphDb, manifestPath)
log.info(`Multilevel manifest file written to ${manifestPath}.`)

const multilevelServer = multilevel.server(levelgraphDb)
const tcpServer = net.createServer((connection) => {
  connection
    .pipe(multilevelServer)
    .pipe(connection)
})

function importFixtures(cb) {
  const fixturesStream = fs.createReadStream(path.resolve(__dirname, 'fixtures.n3'))
  const putStream = levelgraphDb.n3.putStream()

  putStream.once('finish', () => {
    log.info('FINISH')

    cb()
  })

  putStream.once('error', (error) => {
    log.info('ERROR', error)

    cb(error)
  })

  fixturesStream
    .pipe(putStream)
}

tcpServer.listen(PORT, (error) => {
  log.info(`Multilevel server running at tcp://0.0.0.0:${PORT}.`)

  log.info('Importing fixtures.')
  importFixtures((error) => {
    if (error) {
      log.error(error)
      process.exit()
    }

    log.info('Fixtures imported.')
  })
})
