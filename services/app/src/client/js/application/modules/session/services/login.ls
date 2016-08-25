hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions
{ push }          = require \react-router-redux

set-cookie-service = require \./set-cookie

login-start   = create-action \user:login:start
login-success = create-action \user:login:success
login-failure = create-action \user:login:failure

{ User } = global.loopback-application.models

handle-login = (output) ->
  (error, result) !->
    if error
      output.write login-failure error
      return

    result.token = result.id
    delete result.id

    output.write login-success result

    set-cookie-service result
      .each output~write
      .done ->
        # TODO: Use Authorization to determine location.
        output.write push \/admin
        output.end!

module.exports = (email, password) ->
  log.debug \modules/session/services/login

  output = hl!
  output.write login-start!

  User.login email: email, password: password, handle-login output

  output
