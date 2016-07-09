hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

get-cookie-service = require \../modules/session/services/get-cookie

module.exports = initialize = ->
  log.debug \services/initialize

  get-cookie-service!
