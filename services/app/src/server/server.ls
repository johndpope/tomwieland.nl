boot     = require \loopback-boot
loopback = require \loopback
log = require \loglevel

# TODO: Change in production
log.set-level \debug

acl              = require \./middleware/acl
authentication   = require \./middleware/authentication
blog-data        = require \./middleware/blog-data
dummy-users-data = require \./middleware/dummy-users-data
logger           = require \./middleware/logger
rest-API         = require \./middleware/rest-api
serve-index      = require \./middleware/serve-index

app = loopback!

(require \loopback-ds-readonly-mixin) app
(require \loopback-ds-ips-mixin) app

boot app, __dirname, (error, cb) ->
  throw error if error

  error <-! logger app
  throw error if error

  error <-! authentication app
  throw error if error

  error <-! rest-API app
  throw error if error

  error <-! acl app
  throw error if error

  error <-! dummy-users-data app
  throw error if error

  error <-! blog-data app
  throw error if error

  if require.main is module
    app.server = app.listen !->
      app.emit \started

      console.log "Web server listening at: #{app.get \url}"

module.exports = app
