hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions
{ push }          = require \react-router-redux

clear-cookie-service = require \./clear-cookie

logout-start   = create-action \user:logout:start
logout-success = create-action \user:logout:success
logout-failure = create-action \user:logout:failure

module.exports = (token) ->
  log.debug \modules/session/services/logout, token

  output = hl!

  output.write logout-start!

  uri     = "#{window.location.origin}/api/users/logout"
  options =
    method: \POST
    headers:
      Accept:         \application/json
      'Content-Type': \application/json
      Authorization:  token

  hl fetch uri, options
    .to-callback (error, body) ->
      if error
        output.write logout-failure error
        output.end!

      else
        output.write logout-success!

        clear-cookie-service!
          .each output~write
          .done ->
            output.write push \/
            output.end!

  output
