const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env

const DB_ADDRESS = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

console.log('KNEXFILE', DB_ADDRESS)

module.exports = {
  development: {
    client: 'postgresql',
    connection: DB_ADDRESS,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './build/server/migrations',
    },
    seeds: {
      directory: './build/server/seeds',
    },
  },


  staging: {
    client: 'postgresql',
    connection: DB_ADDRESS,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './build/server/migrations',
    },
    seeds: {
      directory: './build/server/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: DB_ADDRESS,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './build/server/migrations',
    },
    seeds: {
      directory: './build/server/seeds',
    },
  },
}
