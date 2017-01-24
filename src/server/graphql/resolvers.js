import log from 'loglevel'
import { Kind } from 'graphql/language'

import { getDatabase } from '../database'

const db = getDatabase()

const asJSON = a => a.toJSON()
const asFirst = a => a[0]

export default {
  Date: {
    __parseValue(value) {
      return new Date(value); // value from the client
    },

    __serialize(value) {
      return value.getTime(); // value sent to the client
    },

    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return +ast.value
      }

      return null;
    },
  },

  Article: {
    user({ user_id }, args, context) {
      return models.User
        .where({ id: user_id })
        .fetch()
        .then(asJSON)
    },

    tags(root, args, context) {
    },

    comments({ id }, args, context) {
      return models.Comment
        .where({ article_id: id })
        .fetch()
        .then(asJSON)
    },
  },

  Comment: {
  },

  Query: {
    Articles(root, args, context) {
      return db.models.Article.all()
    },

    ArticleBySlug(root, { slug }, context) {
      return db.models.Article.findOneBySlug(slug)
    },
  },
}


/*
  Query: {
    Users() {
      return User
        .find({})
    },

    UserById(id) {
      return User
        .findOne({ id })
    },

    UserByEmail(email) {
      return User
        .findOne({ email })
    },

    UserByUsername(username) {
      return User
        .findOne({ username })
    },

    Articles() {
      log.debug('Articles')
    },

    ArticleById(id) {
      return Article
        .findOne({ id })
    },

    ArticleBySlug(slug) {
      return Article
        .findOne({ slug })
    },
  },

  Mutation: {
    UserLoginWithEmail(_, { email, password }) {
      return User.login({ email, password })
    },

    UserLoginWithUsername(_, { username, password }) {
      return User.login({ username, password })
    },

    UserLogout(_, { accessTokenId }) {
      return User.logout(accessTokenId)
    },
  },

  Subscription: {
    postUpvoted(post) {
    },
  },
}
  */
