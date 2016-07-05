hl = require \highland
#request = require \request
{ create-action } = require \redux-actions
{ push } = require \react-router-redux

clear-cookie = require \../services/clear-cookie

logout-start = create-action \user:logout:start
logout-success = create-action \user:logout:success
logout-failure = create-action \user:logout:failure

logout = create-action \user:logout, (token) ->
  output = hl!

  output.write logout-start!

  /*
  request(
    method: \post
    url: "#{window.location.origin}/api/users/logout"
    headers:
      Authorization: token
  )
    .pipe JSONStream.parse!
    .pipe hl!
    .to-array ([body]) ->
      clear-cookie!
        .errors (error, push) ->
          output.write(logout-failure error)
          push null

        .each output~write

        .done ->
          output.write logout-success!
          output.write push "/"
          output.end!
  */

  output

module.exports = logout
