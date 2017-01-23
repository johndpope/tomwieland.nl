import path from 'path'
import net from 'net'

import log from 'loglevel'
import multilevel from 'multilevel'
import { Kind } from 'graphql/language'

import models from '../models'
import collections from '../collections'

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

  BlogPost: {
    user(root, args, context) {
      return new models.User({ id: root.user_id })
        .fetch()
        .then(result => result.toJSON())
    },

    tags(root, args, context) {
    },

    comments(root, args, context) {
      return models.BlogPost
        .fetchAll({
          blogpost_id: root.id,
        })
        .then(result => result.toJSON())
    },
  },

  BlogComment: {
  },

  Query: {
    BlogPosts() {
      return models.BlogPost
        .fetchAll()
        .then((posts) => {
          return posts.toJSON()
        })
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

    BlogPosts() {
      log.debug('BlogPosts')
    },

    BlogPostById(id) {
      return BlogPost
        .findOne({ id })
    },

    BlogPostBySlug(slug) {
      return BlogPost
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
