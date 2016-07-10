log = require \loglevel

/*
admin
member
user
*/

create-user  = (app, cb) !->
  log.debug \middleware/acl/admin/create-user

  { user } = app.models

  error, admin-user <-! user.find-one do
    where:
      username: \admin

  log.debug \middleware/acl/admin/create-user:admin-user, error, admin-user

  if error
    return cb error

  if admin-user
    return cb void, admin-user

  error, created-admin-user <-! user.create do
    username: \admin
    email:    \admin@test.com
    password: \test

  log.debug \middleware/acl/admin/create-user:created-admin-user, error, created-admin-user

  if error
    return cb error

  cb void, created-admin-user

create-role = (app, cb) !->
  log.debug \middleware/acl/admin/create-role

  { Role } = app.models

  error, admin-role <-! Role.find-one do
    where:
      name: \admin

  log.debug \middleware/acl/admin/create-role:admin-role, error, admin-role

  if error
    return cb error

  if admin-role
    return cb void, admin-role

  error, created-admin-role <-! Role.create do
    name: \admin

  log.debug \middleware/acl/admin/create-role:created-admin-role, error, created-admin-role

  if error
    return cb error

  cb void, created-admin-role

create-rolemapping = (app, user, role, cb) !->
  log.debug \middleware/acl/admin/create-rolemapping

  { RoleMapping } = app.models

  error, admin-rolemapping <-! RoleMapping.find-one do
    where:
      principal-id:   user.id
      principal-type: RoleMapping.USER
      role-id:        role.id

  log.debug \middleware/acl/admin/create-rolemapping:admin-rolemapping, error, admin-rolemapping

  if error
    return cb error

  if admin-rolemapping
    return cb void, admin-rolemapping

  error, created-admin-rolemapping <-! RoleMapping.create do
    principal-id:   user.id
    principal-type: RoleMapping.USER
    role-id:        role.id

  log.debug \middleware/acl/admin/create-rolemapping:created-admin-rolemapping, error, created-admin-rolemapping

  if error
    return cb error

  cb void, created-admin-rolemapping

create-acl = (app, user, role, rolemapping, cb) !->
  log.debug \middleware/acl/admin/create-acl

  { ACL } = app.models

  error, admin-acl <-! ACL.find-one do
    where:
      rolename: "admin"

  log.debug \middleware/acl/admin/create-acl:admin-acl, error, admin-acl

  if error
    return cb error

  if admin-acl
    return cb void, admin-acl

  error, created-admin-acl <-! ACL.create do
    model:          \user
    property:       \*
    access-type:    \*
    permission:     \ALLOW
    principal-type: \ROLE
    principal-id:   \admin

  log.debug \middleware/acl/admin/create-acl:created-admin-acl, error, created-admin-acl

  if error
    return cb error

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

  if error
    return cb error

  log.debug \middleware/acl/admin:user, user

  error, role <-! create-role app

  if error
    return cb error

  log.debug \middleware/acl/admin:role, role

  error, rolemapping <-! create-rolemapping app, user, role

  if error
    return cb error

  log.debug \middleware/acl/admin:rolemapping, rolemapping

  error, acl <-! create-acl app, user, role, rolemapping

  if error
    return cb error

  log.debug \middleware/acl/admin:acl, acl

  cb!
