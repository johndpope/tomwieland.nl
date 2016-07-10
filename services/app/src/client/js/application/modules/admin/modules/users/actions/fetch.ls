hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

fetch-service = require \../services/fetch

fetch = create-action \admin:users:fetch, (token, skip, limit, order) ->
  log.debug \modules/admin/modules/user/actions/fetch, token, skip, limit, order

  fetch-service token, skip, limit, order

module.exports = fetch
