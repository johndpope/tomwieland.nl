import knex from 'knex'
import bookshelf from 'bookshelf'

const DB_HOSTNAME = '0.0.0.0'
const DB_USERNAME = 'postgres'
const DB_PASSWORD = 'postgres'
const DB_PORT = 5432
const DB_DATABASE = process.env.NODE_ENV === 'develop' ? 'tomwieland_nl_develop' : 'tomwieland_nl_production'
const DB_ADDRESS = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`

let knexHandler
let bookshelfHandler

export function getKnexHandler() {
  if (knexHandler) {
    return knexHandler
  }

  knexHandler = knex({
    client: 'pg',
    connection: DB_ADDRESS,
    searchPath: 'knex,public',
  })

  return knexHandler
}

export function getBookshelfHandler() {
  if (bookshelfHandler) {
    return bookshelfHandler
  }

  const knexHandlerReference = getKnexHandler()

  bookshelfHandler = bookshelf(knexHandlerReference)

  bookshelfHandler.plugin('registry')
  bookshelfHandler.plugin('virtuals')
  bookshelfHandler.plugin('visibility')
  bookshelfHandler.plugin('pagination')

  return bookshelfHandler
}
