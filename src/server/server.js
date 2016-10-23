import log from 'loglevel'
import loopback from 'loopback'
import boot from 'loopback-boot'

import acl from './middleware/acl'
import authentication from './middleware/authentication'
import blogData from './middleware/blog-data'
import dummyUsersData from './middleware/dummy-users-data'
import logger from './middleware/logger'
import restAPI from './middleware/rest-api'
import graphql from './middleware/graphql'
// import serveIndex from './middleware/serve-index'

log.setLevel('debug')

const app = loopback()

boot(app, __dirname, (error, cb) => {
  if (error) {
    throw error
  }

  logger(app, (error) => {
    if (error) {
      throw error
    }

    authentication(app, (error) => {
      if (error) {
        throw error
      }

      restAPI(app, (error) => {
        if (error) {
          throw error
        }

        acl(app, (error) => {
          if (error) {
            throw error
          }

          graphql(app, (error) => {
            if (error) {
              throw error
            }

            dummyUsersData(app, (error) => {
              if (error) {
                throw error
              }

              blogData(app, (error) => {
                if (error) {
                  throw error
                }

                if (require.main === module) {
                  app.server = app.listen(() => {
                    app.emit('started')
                    console.log(`Web server listening at: ${app.get('url')}`)
                  })
                }
              })
            })
          })
        })
      })
    })
  })
})

export default app
