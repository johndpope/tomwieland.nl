hl = require \highland
#request = require \request
{ create-action } = require \redux-actions
{ push } = require \react-router-redux

set-cookie = require \./set-cookie

login-start = create-action \user:login:start
login-success = create-action \user:login:success
login-failure = create-action \user:login:failure

module.exports = login = (email, password) ->
  output = hl!
  output.write login-start!

  error, response, body <-! request do
    method: \post
    url: "#{window.location.origin}/api/users/login"
    json: true
    body:
      email
      password

  if error
    output.write login-failure error
    output.end!
    return output

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

  return output
