hl = require \highland
cookies = require \cookies-js
{ create-action } = require \redux-actions

get-profile = require \../services/get-profile

set-cookie-start = create-action \user:set-cookie:start
set-cookie-success = create-action \user:set-cookie:success
set-cookie-failure = create-action \user:set-cookie:failure

set-cookie = create-action 'user:setCookie', ({ created, token, ttl, user-id }) ->
  output = hl!

  output.write set-cookie-start!

  cookies-options =
    path: \/
    domain: window.location.hostname
    expires: new Date new Date!.value-of! + ttl
    secure: false

  cookies.set \created, created, cookies-options
  cookies.set \token, token, cookies-options
  cookies.set \ttl, ttl, cookies-options
  cookies.set \user-id, user-id, cookies-options

  get-profile token, user-id
    .each(output.write.bind output)
    .done ->
      output.write set-cookie-success do
        created
        token
        ttl
        user-id

      output.end!

  output

module.exports = set-cookie
