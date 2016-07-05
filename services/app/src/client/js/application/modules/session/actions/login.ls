hl = require \highland
#request = require \request
{ create-action } = require \redux-actions
{ push } = require \react-router-redux

set-cookie = require \../services/set-cookie

login-start = create-action \user:login:start
login-success = create-action \user:login:success
login-failure = create-action \user:login:failure

login = create-action \user:login, (email, password) ->
  output = hl!

  output.write login-start!

  /*
  request(
    method: \post
    url: "#{window.location.origin}/api/users/login"
    json: true
    body:
      email: email
      password: password
  )
    .pipe json-stream.parse!
    .pipe hl!
    .map (a) ->
      a.token = a.id
      delete a.id
      a

    .to-array ([body]) ->
      set-cookie body
        .each output~write
        .done ->
          output.write login-success!
          output.write push "/"
          output.end!
  */

  output

module.exports = login
