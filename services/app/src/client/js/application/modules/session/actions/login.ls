hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

login-service = require \../services/login

login = create-action \user:login, (email, password) ->
  log.debug \modules/session/actions/login

  login-service email, password

module.exports = login
