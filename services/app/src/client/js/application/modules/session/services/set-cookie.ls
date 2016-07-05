hl = require \highland
cookies = require \cookies-js
{ create-action } = require \redux-actions

get-profile = require \./get-profile

set-cookie-start = create-action \user:set-cookie:start
set-cookie-success = create-action \user:set-cookie:success
set-cookie-failure = create-action \user:set-cookie:failure

module.exports = ({ created, token, ttl, user-id }) ->
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

  output.write set-cookie-success do
    created
    token
    ttl
    user-id

  get-profile token, user-id
    .each output~write
    .done ->
      output.end!

  output
