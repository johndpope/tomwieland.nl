module.exports = (app, cb) ->
  { user } = app.models

  error, moderator-user <-! user.find-one do
    where:
      username: "moderator"

  return cb error if error
  return cb! if moderator-user

  error <-! user.create do
    {
      username: "moderator"
      email:    "moderator@test.com"
      password: "test"
    }

  return cb error if error

  cb!
