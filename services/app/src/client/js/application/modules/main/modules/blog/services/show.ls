hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

{
  is-type
} = require \prelude-ls

show-start   = create-action \main:blog:show:start
show-success = create-action \main:blog:show:success
show-failure = create-action \main:blog:show:failure

module.exports = (token, slug) ->
  log.debug \modules/main/modules/blog/services/show, token, slug

  output = hl!
  output.write show-start!

  filter = JSON.stringify do
    where:
      slug: slug

  uri     = "#{window.location.origin}/api/blogposts?filter=#{filter}"
  options =
    method: \GET
    headers:
      'Content-Type': \application/json
      Accept: \application/json
      Authorization: token

  log.debug \modules/main/modules/blog/services/show:uri, uri
  log.debug \modules/main/modules/blog/services/show:options, options

  hl fetch uri, options
    .flatMap (response) ->
      # JSON returns a Promise, so wrap it and resolve it.
      hl response.json!

    .to-callback (error, body) ->
      if error
        output.write show-failure error
        output.end!
      else
        output.write show-success body
        output.end!

  output
