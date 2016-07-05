module.exports = (app, cb) ->
  { user } = app.models

  error, user-user <-! user.find-one do
    where:
      username: "user"

  return cb error if error
  return cb! if user-user

  error <-! user.create do
    {
      username: "user"
      email:    "user@test.com"
      password: "test"
    }

  return cb error if error

  cb!
