cookies = require \cookies-js
hl      = require \highland
log     = require \loglevel

{ create-action } = require \redux-actions

clear-cookie-start   = create-action \user:clear-cookie:start
clear-cookie-success = create-action \user:clear-cookie:success
clear-cookie-failure = create-action \user:clear-cookie:failure

module.exports = ->
  log.debug \modules/session/services/clear-cookie

  output = hl!

  output.write clear-cookie-start!

  cookies-options =
    path: \/
    domain: window.location.hostname

  cookies.expire \created, cookies-options
  cookies.expire \token, cookies-options
  cookies.expire \ttl, cookies-options
  cookies.expire \user-id, cookies-options

  output.write clear-cookie-success!
  output.end!

  output
