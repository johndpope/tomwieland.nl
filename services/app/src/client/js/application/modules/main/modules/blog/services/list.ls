log               = require \loglevel
{ create-action } = require \redux-actions

fetch-api = require \../../../../../../library/fetch-api

main-blog-list-start   = create-action \main:blog:list:start
main-blog-list-success = create-action \main:blog:list:success
main-blog-list-failure = create-action \main:blog:list:failure

module.exports = (token, skip = 0, limit = 100, order = 'created DESC') ->
  log.debug \modules/main/modules/blog/services/list, token, skip, limit, order

  filter = JSON.stringify do
    skip: skip
    limit: limit
    order: order

  url = "#{window.location.origin}/api/blogposts?filter=#{filter}"

  options =
    method: \GET
    headers:
      'Content-Type':  \application/json
      Accept:          \application/json
      Authorization:   token

  fetch-api url, options, main-blog-list-start, main-blog-list-success, main-blog-list-failure
