hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions
{ push }          = require \react-router-redux

set-cookie-service = require \./set-cookie

login-start = create-action \user:login:start
login-success = create-action \user:login:success
login-failure = create-action \user:login:failure

module.exports = (email, password) ->
  log.debug \modules/session/services/login

  output = hl!
  output.write login-start!

  uri     = "#{window.location.origin}/api/users/login"
  options =
    method: \POST
    headers:
      Accept:         \application/json
      'Content-Type': \application/json
    body: JSON.stringify do
      email: email
      password: password

  hl fetch uri, options
    .flatMap (response) ->
      # JSON returns a Promise, so wrap it and resolve it.
      hl response.json!

    .to-callback (error, body) ->
      if error
        output.write login-failure error
        output.end!
      else
        body.token = body.id
        delete body.id

        set-cookie-service body
          .each output~write

          .done ->
            output.write login-success body
            # TODO: Use Authorization to determine location.
            output.write push \/admin
            output.end!

  output
