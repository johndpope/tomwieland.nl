cookies = require \cookies-js
hl      = require \highland
log     = require \loglevel

{ create-action } = require \redux-actions

start   = create-action \user:clear-cookie:start
success = create-action \user:clear-cookie:success
failure = create-action \user:clear-cookie:failure

module.exports = ->
  log.debug \modules/session/services/clear-cookie

  output = hl!

  output.write start!

  cookies-options =
    path: \/
    domain: window.location.hostname

  cookies.expire \created, cookies-options
  cookies.expire \token, cookies-options
  cookies.expire \ttl, cookies-options
  cookies.expire \user-id, cookies-options

  output.write success!
  output.end!

  output
