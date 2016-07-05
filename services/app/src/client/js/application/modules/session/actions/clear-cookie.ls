hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

clear-cookie-service = require \../services/clear-cookie

clear-cookie = create-action \user:clear-cookie, ->
  log.debug \modules/session/actions/clear-cookie

  output = hl!

  clear-cookie-service!
    .each output~write
    .then output~end

  output

module.exports = clear-cookie
