import log from 'loglevel'

export default function ACL(app, cb) {
  log.info('middleware:fixtures:ACL')

  const { user, Role, RoleMapping, ACL } = app.models

  log.debug('middleware:fixtures:ACL:destroying')

  ACL.destroyAll({ fixture: true }, (error) => {
    if (error) return cb(error)

    const record = {
      model: 'user',
      property: '*',
      accessType: '*',
      permission: 'ALLOW',
      principalType: 'ROLE',
      principalId: 'admin',
    }

    log.debug('middleware:fixtures:ACL:creating')

    ACL.create(record, error => {
      if (error) return cb(error)

      log.debug('middleware:fixtures:ACL:created')

      cb()
    })
  })
}
