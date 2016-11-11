import log from 'loglevel'

export default function Role(app, cb) {
  log.info('middleware:fixtures:Role')

  const { Role } = app.models

  Role.findOne({ fixture: true }, (error, result) => {
    if (error) return cb(error)

    if (result) return cb()

    const record = {
      fixture: true,
      name: 'admin',
    }

    log.debug('middleware:fixtures:Role:creating')

    Role.create(record, (error) => {
      if (error) return cb(error)

      log.debug('middleware:fixtures:Role:created')

      cb()
    })
  })
}
