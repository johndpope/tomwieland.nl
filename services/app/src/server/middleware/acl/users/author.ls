module.exports = (app, cb) ->
  { user } = app.models

  error, author-user <-! user.find-one do
    where:
      username: "author"

  return cb error if error
  return cb! if author-user

  error <-! user.create do
    {
      username: "author"
      email:    "author@test.com"
      password: "test"
    }

  return cb error if error

  cb!
