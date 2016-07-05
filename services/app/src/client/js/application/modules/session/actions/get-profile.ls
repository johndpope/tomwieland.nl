hl = require \highland
#request = require \request
{ create-action } = require \redux-actions

get-profile-start = create-action \user:get-profile:start
get-profile-success = create-action \user:get-profile:success
get-profile-failure = create-action \user:get-profile:failure

get-profile = create-action \user:get-profile, (token, user-id) ->
  output = hl!

  output.write get-profile-start!

  /*
  request(
    method: \get
    url: "#{window.location.origin}/api/users/#{user-id}"
    json: true
    headers:
      Authorization: token
  )
    .pipe json-stream.parse!

    .pipe hl!

    .to-array ([body]) ->
      output.write(get-profile-success body)
      output.end!
  */

  output

module.exports = get-profile
