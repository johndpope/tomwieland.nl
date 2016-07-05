module.exports = (app, cb) ->
  { user } = app.models

  error, subscriber-user <-! user.find-one do
    where:
      username: "subscriber"

  return cb error if error
  return cb! if subscriber-user

  error <-! user.create do
    {
      username: "subscriber"
      email:    "subscriber@test.com"
      password: "test"
    }

  return cb error if error

  cb!
