module.exports = (app, cb) ->
  { Role } = app.models

  error, role <-! Role.find-one do
    where:
      name: "moderator"

  return cb error if error
  return cb! if role

  error <-! Role.create do
    {
      name: "moderator"
    }

  return cb error if error

  cb!
