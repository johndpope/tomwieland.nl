module.exports = (app, cb) ->
  { user } = app.models

  error, member-user <-! user.find-one do
    where:
      username: "member"

  return cb error if error
  return cb! if member-user

  error <-! user.create do
    {
      username: "member"
      email:    "member@test.com"
      password: "test"
    }

  return cb error if error

  cb!
