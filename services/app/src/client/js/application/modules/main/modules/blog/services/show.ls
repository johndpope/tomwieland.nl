log               = require \loglevel
{ create-action } = require \redux-actions

fetch-api = require \../../../../../../library/fetch-api

main-blog-show-start   = create-action \main:blog:show:start
main-blog-show-success = create-action \main:blog:show:success
main-blog-show-failure = create-action \main:blog:show:failure

module.exports = (token, slug) ->
  log.debug \modules/main/modules/blog/services/show, token, slug

  filter = JSON.stringify do
    where:
      slug: slug

  url = "#{window.location.origin}/api/blogposts?filter=#{filter}"

  options =
    method: \GET
    headers:
      'Content-Type':  \application/json
      Accept:          \application/json
      Authorization:   token

  fetch-api url, options, main-blog-show-start, main-blog-show-success, main-blog-show-failure
