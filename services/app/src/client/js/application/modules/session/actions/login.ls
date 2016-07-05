hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

login-service = require \../services/login

login = create-action \user:login, ->
  log.debug \modules/session/actions/login

  output = hl!

  login-service!
    .each output~write
    .then output~end

  output

module.exports = login
