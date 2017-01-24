import { Schema } from 'jugglingdb'

const DB_HOSTNAME = '0.0.0.0'
const DB_USERNAME = 'postgres'
const DB_PASSWORD = 'postgres'
const DB_PORT = 5432
const DB_DATABASE = process.env.NODE_ENV === 'develop' ? 'tomwieland_nl_develop' : 'tomwieland_nl_production'
const DB_ADDRESS = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`

let db

// TODO: Relationships.
// TODO: Indexes.
export function getDatabase() {
  if (db) {
    return db
  }

  db = new Schema('postgres', {
    host: DB_HOSTNAME,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    ssl: true,
    debug: true,
  })

  const Article = db.define('Article', {
    // TODO: Unique index
    title: {
      type: String,
      required: true,
      length: 255,
    },

    // TODO: Unique index
    slug: {
      type: String,
      required: true,
      length: 255,
    },

    body: {
      type: Schema.Text,
      required: true,
    },

    created: {
      type: Date,
      required: true,
      default: () => new Date(),
    },

    updated: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  })
  Article.findOneBySlug = slug => Article.findOne({ where: { slug } })

  const Comment = db.define('Comment', {
    body: {
      type: Schema.Text,
      required: true,
    },

    created: {
      type: Date,
      required: true,
      default: () => new Date(),
    },

    updated: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  })

  const Tag = db.define('Tag', {
    label: {
      type: String,
      required: true,
      length: 255,
    },
  })

  const User = db.define('User', {
    // TODO: Email validation?
    // TODO: Unique Index.
    email: {
      type: String,
      required: true,
      length: 255,
    },

    username: {
      type: String,
      required: true,
      length: 24,
    },

    password: {
      type: String,
      required: true,
      length: 255,
    },
  })

  Article.belongsTo(User, { as: 'articles', foreignKey: 'user_id' })
  Article.hasMany(Comment, { as: 'comments', foreignKey: 'article_id' })
  Article.hasAndBelongsToMany(Tag, { as: 'tags' })

  Comment.belongsTo(User, { as: 'comments', foreignKey: 'user_id' })
  Comment.belongsTo(Article, { as: 'article', foreignKey: 'article_id' })

  Tag.hasAndBelongsToMany(Article, { as: 'articles' })

  User.hasMany(Article, { as: 'articles', foreignKey: 'user_id' })
  User.hasMany(Comment, { as: 'comments', foreignKey: 'user_id' })

  return db
}
