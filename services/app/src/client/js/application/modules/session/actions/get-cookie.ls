hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

get-cookie-service = require \../services/get-cookie

get-cookie = create-action \user:get-cookie, ->
  log.debug \modules/session/actions/get-cookie

  get-cookie-service!

module.exports = get-cookie
