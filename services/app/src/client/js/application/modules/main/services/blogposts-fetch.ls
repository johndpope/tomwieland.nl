hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

blogposts-fetch-start   = create-action \main:blogposts:fetch:start
blogposts-fetch-success = create-action \main:blogposts:fetch:success
blogposts-fetch-failure = create-action \main:blogposts:fetch:failure

module.exports = blogposts-fetch = (token, skip, limit, order) ->
  log.debug \modules/main/services/blogposts-fetch, token, skip, limit, order

  output = hl!
  output.write blogposts-fetch-start!

  filters = [
    "filter[skip]=#{skip}"
    "filter[limit]=#{limit}"
    "filter[order]=#{order}"
  ].join \&

  uri     = "#{window.location.origin}/api/blogposts?#{filters}"
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
        output.write blogposts-fetch-failure error
        output.end!
      else
        output.write blogposts-fetch-success body
        output.end!

  output
