hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

get-profile-service = require \../services/get-profile

get-profile = create-action \user:get-profile, ->
  log.debug \modules/session/actions/get-profile

  output = hl!

  get-profile-service!
    .each output~write
    .then output~end

  output

module.exports = get-profile
