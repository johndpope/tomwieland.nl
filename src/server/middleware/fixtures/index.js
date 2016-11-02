import async from 'async'

import User from './User'
import Role from './Role'
import RoleMapping from './RoleMapping'
import ACL from './ACL'

import log from 'loglevel'

export default (app, cb) => {
  log.info('middleware:fixtures:starting')

  async.parallel([
    cb => {
      async.series([
        cb => User(app, cb),
        cb => Role(app, cb),
        cb => RoleMapping(app, cb),
      ], cb)
    },
    cb => ACL(app, cb),
  ], error => {
    if (error) return cb(error)

    log.info('middleware:fixtures:completed')

    cb()
  })
}
