module.exports = (app, cb) !->
  { user, Role, RoleMapping } = app.models

  error, admin-user <-! user.find-one do
    where:
      username: "admin"

  return cb error if error
  return cb! if admin-user

  error, role <-! Role.find-one do
    where:
      name: "admin"

  return cb error if error
  return cb! if role

  error, role-mapping <-! RoleMapping.find-one do
    where:
      role-id: admin-user.id

  return cb error if error
  return cb! if role-mapping

  error <-! RoleMapping.create do
    principal-id:   admin-user.id
    principal-type: RoleMapping.USER
    role-id:        role.id

  return cb error if error

  cb!
