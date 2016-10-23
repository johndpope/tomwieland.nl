import _ from 'lodash'
import faker from 'faker'
import hl from 'highland'
import log from 'loglevel'

function createUser(app, cb) {
  const { User } = app.models

  User.create({
    created: faker.fake('{{date.past}}'),
    emailVerified: Math.ceil(Math.random()),
    email: faker.fake('{{internet.email}}'),
    lastUpdated: faker.fake('{{date.past}}'),
    password: faker.fake('{{internet.password}}'),
    status: faker.fake('{{internet.password}}'),
    username: faker.fake('{{internet.userName}}'),
    dummy: true,
  }, (error, user) => {
    if (error) {
      return cb(error)
    }

    cb(null, user)
  })
}

function createUsers(app, amount, cb) {
  hl(_.range(1, amount))
    .flatMap(hl.wrapCallback((i, cb) => createUser(app, cb)))
    .collect()
    .toCallback(cb)
}

export default (app, cb) => {
  log.debug('middleware/blog-data')

  const { User } = app.models

  User.destroyAll({
    dummy: true,
  }, (error) => {
    log.debug('middleware/blog-data:destroyed-users', error)

    if (error) {
      return cb(error)
    }

    createUsers(app, 25, (error, results) => {
      log.debug('middleware/blog-data:created-users', error, results.length)

      if (error) {
        return cb(error)
      }

      cb()
    })
  })
}
