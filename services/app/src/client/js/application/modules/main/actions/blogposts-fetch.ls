hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

blogposts-fetch-service = require \../services/blogposts-fetch

fetch = create-action \main:blogposts:fetch, (token, skip, limit, order) ->
  log.debug \modules/main/actions/blogposts-fetch, token, skip, limit, order

  blogposts-fetch-service token, skip, limit, order

module.exports = fetch
