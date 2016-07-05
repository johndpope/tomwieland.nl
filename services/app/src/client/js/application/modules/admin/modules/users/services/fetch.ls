hl = require \highland
#request = require \request
{ create-action } = require \redux-actions

admin-users-list-fetch-start = create-action \admin:users:fetch:start
admin-users-list-fetch-success = create-action \admin:users:fetch:success
admin-users-list-fetch-failure = create-action \admin:users:fetch:failure

module.exports = admin-users-list-fetch = (token, skip, limit, order) ->
  output = hl!

  output.write admin-users-list-fetch-start!

  filters = [
    "filter[skip]=#{skip}"
    "filter[limit]=#{limit}"
    "filter[order]=#{order}"
  ].join \&

  /*
  request(
    method: \get
    url: "#{window.location.origin}/api/users?#{filters}"
    json: true
    headers:
      Authorization: token
  )
    .on \error, (error) ->
      output.write(admin-users-list-fetch-failure error)
      output.end!
    .pipe JSONStream.parse!
    .pipe hl!
    .to-array ([body]) ->
      output.write(admin-users-list-fetch-success body)
      output.end!
  */

  output
