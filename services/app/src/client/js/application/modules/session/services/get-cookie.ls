cookies = require \cookies-js
hl = require \highland
{ create-action } = require \redux-actions

get-profile = require \./get-profile

get-cookie-start = create-action \user:get-cookie:start
get-cookie-success = create-action \user:get-cookie:success
get-cookie-failure = create-action \user:get-cookie:failure

module.exports = get-cookie = ->
  output = hl!

  output.write get-cookie-start!

  created = cookies.get \created
  token   = cookies.get \token
  ttl     = cookies.get \ttl
  user-id = cookies.get \user-id

  output.write get-cookie-success do
    created: created
    token:   token
    ttl:     ttl
    user-id: user-id

  if !token || !user-id
    output.end!
    output

  get-profile token, user-id
    .each output~write
    .done output~end

  output
