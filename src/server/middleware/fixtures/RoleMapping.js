import log from 'loglevel'

export default function RoleMapping(app, cb) {
  log.info('middleware:fixtures:RoleMapping')

  const { user, Role, RoleMapping } = app.models

  log.debug('middleware:fixtures:RoleMapping:destroying')

  RoleMapping.destroyAll({ fixture: true }, (error) => {
    if (error) return cb(error)

    user.findOne({ username: 'admin', fixture: true }, (error, user) => {
      if (error) return cb(error)

      Role.findOne({ name: 'admin', fixture: true }, (error, role) => {
        if (error) return cb(error)

        const record = {
          fixture: true,
          principalId: user.id,
          principalType: RoleMapping.USER,
          roleId: role.id,
        }

        log.debug('middleware:fixtures:RoleMapping:creating')

        RoleMapping.create(record, error => {
          if (error) return cb(error)

          log.debug('middleware:fixtures:RoleMapping:created')

          cb()
        })
      })
    })
  })
}