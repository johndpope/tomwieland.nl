hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

get-profile-start   = create-action \user:get-profile:start
get-profile-success = create-action \user:get-profile:success
get-profile-failure = create-action \user:get-profile:failure

module.exports = (token, user-id) ->
  log.debug \modules/session/services/get-profile

  output = hl!
  output.write get-profile-start!

  uri     = "#{window.location.origin}/api/users/#{user-id}"
  options =
    method: \GET
    headers:
      'Content-Type': \application/json
      Accept: \application/json
      Authorization: token

  hl fetch uri, options
    .flatMap (response) ->
      # JSON returns a Promise, so wrap it and resolve it.
      hl response.json!

    .to-callback (error, body) ->
      if error
        output.write get-profile-failure error
        output.end!
      else
        output.write get-profile-success body
        output.end!

  output
