module.exports = (app, cb) ->
  { user } = app.models

  error, admin-user <-! user.find-one do
    where:
      username: "admin"

  return cb error if error
  return cb! if admin-user

  error <-! user.create do
    {
      username: "admin"
      email:    "admin@test.com"
      password: "test"
    }

  return cb error if error

  cb!
