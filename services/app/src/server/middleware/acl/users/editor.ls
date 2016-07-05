module.exports = (app, cb) ->
  { user } = app.models

  error, editor-user <-! user.find-one do
    where:
      username: "editor"

  return cb error if error
  return cb! if editor-user

  error <-! user.create do
    {
      username: "editor"
      email:    "editor@test.com"
      password: "test"
    }

  return cb error if error

  cb!
