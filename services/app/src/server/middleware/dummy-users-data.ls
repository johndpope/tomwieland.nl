faker = require \faker
hl    = require \highland
log   = require \loglevel

{
  map
} = require \prelude-ls

create-user = (app, cb) !-->
  title = faker.fake '{{name.title}}'

  error, user <-! app.models.User.create {
    created:         faker.fake '{{date.past}}'
    email-verified:  Math.ceil Math.random!
    email:           faker.fake '{{internet.email}}'
    last-updated:    faker.fake '{{date.past}}'
    password:        faker.fake '{{internet.password}}'
    status:          faker.fake '{{internet.password}}'
    username:        faker.fake '{{internet.userName}}'
    dummy:           true
  }
  return cb error if error
  cb!

create-users = (app, amount, cb) !-->
  hl [ 1 to amount ]
    .flat-map hl.wrap-callback (i, cb) !->
      create-user app, cb
    .collect!
    .to-callback cb

module.exports = (app, cb) !->
  log.debug \middleware/blog-data

  { User } = app.models

  # Destroy all blog posts.
  error <-! User.destroy-all dummy: true
  log.debug \middleware/blog-data:destroyed-users, error
  return cb error if error

  # Recreate them.
  error, results <-! create-users app, 25
  log.debug \middleware/blog-data:created-users, error, results.length
  return cb error if error

  cb!
