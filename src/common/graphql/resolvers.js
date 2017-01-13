import path from 'path'
import net from 'net'

import multilevel from 'multilevel'
import { Kind } from 'graphql/language'

const manifestPath = path.resolve(__dirname, '../../manifest.json')
const manifest = require(manifestPath)
const multilevelClient = multilevel.client(manifest)
const multilevelClientRPCStream = multilevelClient.createRpcStream()
const multilevelClientConnection = net.connect(3001)

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

function promisifyNode(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (error, results) => {
        if (error) {
          return reject(error)
        }

        resolve(results)
      })
    })
  }
}

const get = promisifyNode(multilevelClient.get)
const put = promisifyNode(multilevelClient.get)
const del = promisifyNode(multilevelClient.get)

export default (app) => {
  const { User, BlogPost, BlogComment } = app.models

  return {
    Date: {
      __parseValue(value) {
        return new Date(value); // value from the client
      },
      __serialize(value) {
        return value.getTime(); // value sent to the client
      },
      __parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
      },
    },

    AccessToken: {
      user(root, args, context) {
        return new Promise((resolve, reject) => {
          multilevelClient.search([
            {
              predicate: 'type',
              object: 'AccessToken',
            },
            {
              subject: root.user,
            },
          ], (error, result) => {
            if (error) {
              return reject(error)
            }

            resolve(result)
          })
        })
      },
    },

    BlogPost: {
      user(root, args, context) {
        return get({ subject: root.user })
      },
      blogComments(root, args, context) {
        return get({
          predicate: 'blogPost',
          object: root.id,
        })
      },
    },

    BlogComment: {
      blogPost(root, args, context) {
        return BlogPost
          .findOne({
            id: root.blogPost,
          })
      },
    },

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
        return BlogPost
          .find({})
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

    /*
    Subscription: {
      postUpvoted(post) {
      },
    },
    */
  }
}
