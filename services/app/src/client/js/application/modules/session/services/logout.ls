hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions
{ push }          = require \react-router-redux

clear-cookie = require \./clear-cookie

logout-start = create-action \user:logout:start
logout-success = create-action \user:logout:success
logout-failure = create-action \user:logout:failure

module.exports = (token) ->
  log.debug \modules/session/services/logout

  output = hl!

  output.write logout-start!

  # See login.ls
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
      output.write logout-success!

      clear-cookie!
        .each output~write
        .done ->
          output.write push \/
          output.end!
  */

  output
