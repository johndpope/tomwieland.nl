cookies = require \cookies-js
hl = require \highland
{ create-action } = require \redux-actions

get-profile = require \../services/get-profile

get-cookie-start = create-action \user:get-cookie:start
get-cookie-success = create-action \user:get-cookie:success
get-cookie-failure = create-action \user:get-cookie:failure

get-cookie = create-action \user:get-cookie, ->
  output = hl!

  output.write get-cookie-start!

  created = cookies.get \created
  token = cookies.get \token
  ttl = cookies.get \ttl
  user-id = cookies.get \user-id

  if !token || !user-id
    output

  get-profile token, user-id
    .each output~write
    .done ->
      output.write get-cookie-success do
        created
        token
        ttl
        user-id
      output.end!

  output

module.exports = get-cookie
