hl = require \highland
{ create-action } = require \redux-actions

fetch-service = require \../services/fetch

fetch = create-action \admin:users:fetch, (token, skip, limit, order) ->
  output = hl!

  fetch-service token, skip, limit, order
    .pipe output

  output

module.exports = fetch
