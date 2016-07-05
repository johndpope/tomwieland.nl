hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

set-cookie-service = require \../services/set-cookie

set-cookie = create-action \user:set-cookie, ->
  log.debug \modules/session/actions/set-cookie

  output = hl!

  set-cookie-service!
    .each output~write
    .then output~end

  output

module.exports = set-cookie
