hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

{
  is-type
} = require \prelude-ls

list-start   = create-action \main:blog:list:start
list-success = create-action \main:blog:list:success
list-failure = create-action \main:blog:list:failure

module.exports = (token, skip = 0, limit = 100, order = 'created DESC') ->
  log.debug \modules/main/modules/blog/services/list, token, skip, limit, order

  output = hl!
  output.write list-start!

  filter = JSON.stringify do
    skip: skip
    limit: limit
    order: order

  uri     = "#{window.location.origin}/api/blogposts?filter=#{filter}"
  options =
    method: \GET
    headers:
      'Content-Type': \application/json
      Accept: \application/json
      Authorization: token

  log.debug \modules/main/modules/blog/services/list:uri, uri
  log.debug \modules/main/modules/blog/services/list:options, options

  hl fetch uri, options
    .flatMap (response) ->
      # JSON returns a Promise, so wrap it and resolve it.
      hl response.json!

    .to-callback (error, body) ->
      if error
        output.write list-failure error
        output.end!
      else
        output.write list-success body
        output.end!

  output
