hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions
{ push }          = require \react-router-redux

set-cookie = require \./set-cookie

login-start = create-action \user:login:start
login-success = create-action \user:login:success
login-failure = create-action \user:login:failure

module.exports = (email, password) ->
  log.debug \modules/session/services/login

  output = hl!
  output.write login-start!


  fetch("#{window.location.origin}/api/users/login",
    method: \POST
    headers:
      'Content-Type': \application/json
      Accept: \application/json
    body: JSON.stringify do
      email: email
      password: password
  )
    .then (response) -> response.json!

    .then (body) ->
      # TODO: Test this.
      #body.token = body.id
      #delete body.id

      output.write login-success!

      # TODO: Find out where this each and done come from and document it.
      set-cookie body
        .each output~write

        .done ->
          output.write push \/
          output.end!

          output.write success body
          output.end!

    .catch (error) ->
      output.write failure error
      output.end!

  return output
