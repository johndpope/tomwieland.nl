exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('email')
      table.string('username')
      table.string('password')
    }),

    knex.schema.createTable('tags', (table) => {
      table.increments('id').primary()
      table.string('label')
    }),

    knex.schema.createTable('blogposts', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('slug')
      table.string('body')
      table.timestamp('created').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated').notNullable().defaultTo(knex.raw('now()'))
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
    }),

    knex.schema.createTable('blogposts_tags', (table) => {
      table.increments('id')
      table.integer('blogpost_id').unsigned().references('blogposts.id').onDelete('CASCADE')
      table.integer('tag_id').unsigned().references('tags.id').onDelete('CASCADE')
    }),

    knex.schema.createTable('blogcomments', (table) => {
      table.increments('id').primary()
      table.string('body')
      table.timestamps()
      table.timestamp('created').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated').notNullable().defaultTo(knex.raw('now()'))
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('blogpost_id').unsigned().references('blogposts.id').onDelete('CASCADE')
    }),
  ])
}

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('users'),
  ])
}

