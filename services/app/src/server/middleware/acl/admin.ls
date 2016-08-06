log = require \loglevel

/*
admin
member
user
*/

create-user  = (app, cb) !->
  log.debug \middleware/acl/admin/create-user

  { user } = app.models

  # Destroy everything
  error <-! user.destroy-all
  log.debug \middleware/acl/admin/create-user:deleted, error
  return cb error if error

  # Create a new one
  error, created-admin-user <-! user.create do
    username: \admin
    email:    \admin@test.com
    password: \test
  log.debug \middleware/acl/admin/create-user:created, error, created-admin-user
  return cb error if error

  cb void, created-admin-user

create-role = (app, cb) !->
  log.debug \middleware/acl/admin/create-role

  { Role } = app.models

  # Destroy everything
  error <-! Role.destroy-all
  log.debug \middleware/acl/admin/create-role:deleted, error
  return cb error if error

  # Create a new one
  error, created-admin-role <-! Role.create do
    name: \admin
  log.debug \middleware/acl/admin/create-role:created-admin-role, error, created-admin-role
  return cb error if error

  cb void, created-admin-role

create-rolemapping = (app, user, role, cb) !->
  log.debug \middleware/acl/admin/create-rolemapping, user, role

  { RoleMapping } = app.models

  # Destroy everything
  error <-! RoleMapping.destroy-all
  log.debug \middleware/acl/admin/create-rolemapping:deleted, error
  return cb error if error

  # Create a new one
  error, created-admin-rolemapping <-! RoleMapping.create do
    principal-id:   user.id
    principal-type: RoleMapping.USER
    role-id:        role.id
  log.debug \middleware/acl/admin/create-rolemapping:created-admin-rolemapping, error, created-admin-rolemapping
  return cb error if error

  cb void, created-admin-rolemapping

create-acl = (app, user, role, rolemapping, cb) !->
  log.debug \middleware/acl/admin/create-acl

  { ACL } = app.models

  # Destroy everything
  error <-! ACL.destroy-all
  log.debug \middleware/acl/admin/create-acl:deleted, error
  return cb error if error

  # Create a new one
  error, created-admin-acl <-! ACL.create do
    model:          \user
    property:       \*
    access-type:    \*
    permission:     \ALLOW
    principal-type: \ROLE
    principal-id:   \admin
  log.debug \middleware/acl/admin/create-acl:created-admin-acl, error, created-admin-acl
  return cb error if error

  cb void, created-admin-acl

module.exports = (app, cb) !->
  log.debug \middleware/acl/admin

  {
    user
    Role
    RoleMapping
    ACL
  } = app.models

  error, user <-! create-user app
  return cb error if error
  log.debug \middleware/acl/admin:user, user

  error, role <-! create-role app
  return cb error if error
  log.debug \middleware/acl/admin:role, role

  error, rolemapping <-! create-rolemapping app, user, role
  return cb error if error
  log.debug \middleware/acl/admin:rolemapping, rolemapping

  error, acl <-! create-acl app, user, role, rolemapping
  return cb error if error
  log.debug \middleware/acl/admin:acl, acl

  cb!
