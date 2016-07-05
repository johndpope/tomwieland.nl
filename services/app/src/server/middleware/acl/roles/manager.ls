module.exports = (app, cb) ->
  { Role } = app.models

  error, role <-! Role.find-one do
    where:
      name: "manager"

  return cb error if error
  return cb! if role

  error <-! Role.create do
    {
      name: "manager"
    }

  return cb error if error

  cb!
