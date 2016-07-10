hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

admin-users-list-fetch-start   = create-action \admin:users:fetch:start
admin-users-list-fetch-success = create-action \admin:users:fetch:success
admin-users-list-fetch-failure = create-action \admin:users:fetch:failure

module.exports = admin-users-list-fetch = (token, skip, limit, order) ->
  log.debug \modules/admin/modules/users/components/list/List#component-will-mount, token

  output = hl!
  output.write admin-users-list-fetch-start!

  filters = [
    "filter[skip]=#{skip}"
    "filter[limit]=#{limit}"
    "filter[order]=#{order}"
  ].join \&

  uri     = "#{window.location.origin}/api/users?#{filters}"
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
        output.write admin-users-list-fetch-failure error
        output.end!
      else
        output.write admin-users-list-fetch-success body
        output.end!

  output
