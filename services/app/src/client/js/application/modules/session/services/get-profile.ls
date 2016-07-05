hl = require \highland
#request = require \request
{ create-action } = require \redux-actions

start   = create-action \user:get-profile:start
success = create-action \user:get-profile:success
failure = create-action \user:get-profile:failure

module.exports = get-profile = (token, user-id) ->
  output = hl!
  output.write start!

  fetch("#{window.location.origin}/api/users/#{user-id}",
    method: \GET
    json: true
    headers:
      'Content-Type': \application/json
      Accept: \application/json
      Authorization: token
  )
    .then (response) -> response.json!

    .then (body) ->
      output.write success body
      output.end!

    .catch (error) ->
      output.write failure error
      output.end!

  return output
