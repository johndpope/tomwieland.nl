hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

logout-service = require \../services/logout

logout = create-action \user:logout, ->
  log.debug \modules/session/actions/logout

  output = hl!

  logout-service!
    .each output~write
    .then output~end

  output

module.exports = logout
