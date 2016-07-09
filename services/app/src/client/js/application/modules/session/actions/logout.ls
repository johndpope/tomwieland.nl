hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

logout-service = require \../services/logout

logout = create-action \user:logout, (token) ->
  log.debug \modules/session/actions/logout

  logout-service token

module.exports = logout
