hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

set-cookie-service = require \../services/set-cookie

set-cookie = create-action \user:set-cookie, ->
  log.debug \modules/session/actions/set-cookie

  set-cookie-service!

module.exports = set-cookie
