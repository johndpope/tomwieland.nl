import _ from 'lodash'
import faker from 'faker'
import hl from 'highland'
import log from 'loglevel'

function createAdmin(app, cb) {
  const { user } = app.models

  const record = {
    fixture: true,
    username: 'admin',
    email: 'admin@test.com',
    password: 'test',
  }

  user.create(record, cb)
}

function createDummyUsers(app, cb) {
  const { user } = app.models

  user.create(_.map(_.range(1, 25), i => ({
    fixture: true,
    created: faker.fake('{{date.past}}'),
    emailVerified: Math.ceil(Math.random()),
    email: faker.fake('{{internet.email}}'),
    lastUpdated: faker.fake('{{date.past}}'),
    password: faker.fake('{{internet.password}}'),
    status: faker.fake('{{internet.password}}'),
    username: faker.fake('{{internet.userName}}'),
  })), cb)
}

export default function User(app, cb) {
  log.info('middleware:fixtures:User')

  const { user } = app.models

  user.findOne({ fixture: true }, (error, result) => {
    if (error) return cb(error)

    if (result) return cb()

    log.debug('middleware:fixtures:User:creating')

    createAdmin(app, (error) => {
      if (error) return cb(error)

      createDummyUsers(app, (error) => {
        if (error) return cb(error)

        log.debug('middleware:fixtures:User:created')

        cb()
      })
    })
  })
}
