module.exports = (app, cb) ->
  { user } = app.models

  error, dummy-user <-! user.find-one do
    where:
      username: "dummy1"

  return cb error if error
  return cb! if dummy-user

  dummy-users = for i in [1 to 25]
    username: "dummy#{i}"
    email:    "dummy#{i}@test.com"
    password: "test"

  error <-! user.create dummy-users
  return cb error if error

  cb!
