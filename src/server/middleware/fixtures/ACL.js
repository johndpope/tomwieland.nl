import log from 'loglevel'

export default function ACL(app, cb) {
  log.info('middleware:fixtures:ACL')

  const { user, Role, RoleMapping, ACL } = app.models

  ACL.findOne({ fixture: true }, (error, result) => {
    if (error) return cb(error)

    if (result) return cb()

    const record = {
      model: 'user',
      property: '*',
      accessType: '*',
      permission: 'ALLOW',
      principalType: 'ROLE',
      principalId: 'admin',
    }

    log.debug('middleware:fixtures:ACL:creating')

    ACL.create(record, (error) => {
      if (error) return cb(error)

      log.debug('middleware:fixtures:ACL:created')

      cb()
    })
  })
}
