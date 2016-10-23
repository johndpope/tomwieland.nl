import log from 'loglevel'

/*
admin
member
user
*/

function createUser(app, cb) {
  log.debug('middleware/acl/admin/create-user')

  const { user } = app.models

  user.destroyAll((error) => {
    log.debug('middleware/acl/admin/create-user:deleted', error)

    if (error) {
      return cb(error)
    }

    user.create({
      username: 'admin',
      email: 'admin@test.com',
      password: 'test',
    }, (error, createdAdminUser) => {
      log.debug('middleware/acl/admin/create-user:created', error, createdAdminUser)

      if (error) {
        return cb(error)
      }

      cb(null, createdAdminUser)
    })
  })
}

function createRole(app, cb) {
  log.debug('middleware/acl/admin/create-role')

  const Role = app.models.Role

  Role.destroyAll((error) => {
    log.debug('middleware/acl/admin/create-role:deleted', error)

    if (error) {
      return cb(error)
    }

    Role.create({
      name: 'admin',
    }, (error, createdAdminRole) => {
      log.debug('middleware/acl/admin/create-role:created-admin-role', error, createdAdminRole)

      if (error) {
        return cb(error)
      }

      cb(undefined, createdAdminRole)
    })
  })
}

function createRolemapping(app, user, role, cb) {
  log.debug('middleware/acl/admin/create-rolemapping', user, role)

  const RoleMapping = app.models.RoleMapping
  RoleMapping.destroyAll((error) => {
    log.debug('middleware/acl/admin/create-rolemapping:deleted', error)

    if (error) {
      return cb(error)
    }

    RoleMapping.create({
      principalId: user.id,
      principalType: RoleMapping.USER,
      roleId: role.id,
    }, (error, createdAdminRolemapping) => {
      log.debug('middleware/acl/admin/create-rolemapping:created-admin-rolemapping', error, createdAdminRolemapping)

      if (error) {
        return cb(error)
      }

      cb(undefined, createdAdminRolemapping)
    })
  })
}

function createAcl(app, user, role, rolemapping, cb) {
  log.debug('middleware/acl/admin/create-acl')

  const ACL = app.models.ACL

  ACL.destroyAll((error) => {
    log.debug('middleware/acl/admin/create-acl:deleted', error)

    if (error) {
      return cb(error)
    }

    ACL.create({
      model: 'user',
      property: '*',
      accessType: '*',
      permission: 'ALLOW',
      principalType: 'ROLE',
      principalId: 'admin',
    }, (error, createdAdminAcl) => {
      log.debug('middleware/acl/admin/create-acl:created-admin-acl', error, createdAdminAcl)

      if (error) {
        return cb(error)
      }

      cb(undefined, createdAdminAcl)
    })
  })
}

export default (app, cb) => {
  log.debug('middleware/acl/admin')

  createUser(app, (error, user) => {
    if (error) {
      return cb(error)
    }

    log.debug('middleware/acl/admin:user', user)

    createRole(app, (error, role) => {
      if (error) {
        return cb(error)
      }

      log.debug('middleware/acl/admin:role', role)

      createRolemapping(app, user, role, (error, rolemapping) => {
        if (error) {
          return cb(error)
        }

        log.debug('middleware/acl/admin:rolemapping', rolemapping)

        createAcl(app, user, role, rolemapping, (error, acl) => {
          if (error) {
            return cb(error)
          }

          log.debug('middleware/acl/admin:acl', acl)

          cb()
        })
      })
    })
  })
}
