import net from 'net'
import path from 'path'

import log from 'loglevel'
import level from 'level'
import levelgraph from 'levelgraph'
import levelgraphJSONLD from 'levelgraph-jsonld'
import multilevel from 'multilevel'

const LOGLEVEL =  process.env.LOGLEVEL
const DBPATH   =  process.env.DBPATH
const PORT     = +process.env.PORT

log.info(`Setting log level to "${LOGLEVEL}".`)
log.setLevel(LOGLEVEL)

const levelDb = level('/db')
const levelgraphDb = levelgraphJSONLD(levelgraph(levelDb))

const multilevelServer = multilevel.server(levelgraphDb)

const manifestPath = path.resolve(__dirname, '../manifest.json')

multilevel.writeManifest(levelgraphDb, manifestPath)

log.info(`Manifest written to ${manifestPath}`)

const server = net.createServer(connection => {
  connection
    .pipe(multilevelServer)
    .pipe(connection)
})

server.listen(PORT)

log.info(`Multilevel(Levelgraph-JSONLD(Levelgraph(Level(${DBPATH})))) server running at tcp://0.0.0.0:${PORT}`)

const manifest = require(manifestPath)
const multilevelClient = multilevel.client(manifest)
const multilevelClientRPCStream = multilevelClient.createRpcStream()
const multilevelClientConnection = net.connect(PORT)

multilevelClientConnection
  .pipe(multilevelClientRPCStream)
  .pipe(multilevelClientConnection)

const doc = {
  "@context": {
    "name": "http://xmlns.com/foaf/0.1/name",
    "homepage": {
      "@id": "http://xmlns.com/foaf/0.1/homepage",
      "@type": "@id"
    }
  },
  "@id": "http://manu.sporny.org#person",
  "name": "Manu Sporny",
  "homepage": "http://manu.sporny.org/"
}

multilevelClient.put(doc, error => {
  if (error) {
    throw error
  }

  multilevelClient.get(doc['@id'], { '@context': doc['@context'] }, (error, result) => {
    if (error) {
      throw error
    }

    log.debug('get result:', result)

    multilevelClient.del(doc['@id'], (error, result) => {
      if (error) {
        throw error
      }

      log.info('Done.')
    })
  })
})
