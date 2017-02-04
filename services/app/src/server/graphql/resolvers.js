import log from 'loglevel'
import { Kind } from 'graphql/language'
import _ from 'lodash'

import Article from '../models/Article'
import Comment from '../models/Comment'
import Tag from '../models/Tag'
import User from '../models/User'

const firstResult = a => a[0]
const jsonResult = (a) => {
  return _.isArray(a) ? _.invokeMap(a, 'toJSON') : a.toJSON()
}

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
    user(root, args, context) {
      return User
        .query()
        .where({ id: root.userId })
        .then(firstResult)
        .then(jsonResult)
    },

    tags(root, args, context) {
      return Article
        .query()
        .findById(root.id)
        .then(result => result.$relatedQuery('tags'))
        .then(jsonResult)
    },

    comments(root, args, context) {
      return Comment
        .query()
        .where({ articleId: root.id })
        .then(jsonResult)
    },
  },

  Comment: {
    article(root, args, context) {
      return Article
        .query()
        .findById(root.articleId)
        .then(jsonResult)
    },

    user(root, args, context) {
      return User
        .query()
        .findById(root.userId)
        .then(jsonResult)
    },
  },

  Tag: {
    articles(root, args, context) {
      return Tag
        .query()
        .findById(root.id)
        .then(result => result.$relatedQuery('articles'))
        .then(jsonResult)
    },
  },

  User: {
    articles(root, args, context) {
      return Article
        .query()
        .where({ userId: root.id })
    },

    comments(root, args, context) {
      return Comment
        .query()
        .where({ userId: root.id })
    },
  },

  Query: {
    articles(root, args, context) {
      return Article
        .getArticles()
        .then(jsonResult)
    },

    articlesByUser(root, args, context) {
      return Article
        .getArticlesByUserId(args.userId)
        .then(jsonResult)
    },

    articlesByTag(root, args, context) {
      // TODO: Implement
      return false
    },

    articleById(root, args, context) {
      return Article
        .getArticleById(args.id)
        .then(jsonResult)
    },

    articleBySlug(root, args, context) {
      return Article
        .getArticleBySlug(args.slug)
        .then(jsonResult)
    },

    tags(root, args, context) {
      return Tag
        .getTags()
        .then(jsonResult)
    },

    users(root, args, context) {
      return User
        .getUsers()
        .then(jsonResult)
    },

    userById(root, args, context) {
      return User
        .getUserById(args.id)
        .then(jsonResult)
    },

    userByEmail(root, args, context) {
      return User
        .getUserByEmail(args.email)
        .then(jsonResult)
    },

    userByUsername(root, args, context) {
      return User
        .getUserByUsername(args.username)
        .then(jsonResult)
    },
  },
}

