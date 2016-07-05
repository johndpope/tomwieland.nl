module.exports = (app, cb) ->
  { user } = app.models

  error, manager-user <-! user.find-one do
    where:
      username: "manager"

  return cb error if error
  return cb! if manager-user

  error <-! user.create do
    {
      username: "manager"
      email:    "manager@test.com"
      password: "test"
    }

  return cb error if error

  cb!
