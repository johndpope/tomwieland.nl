hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

get-profile-service = require \../services/get-profile

get-profile = create-action \user:get-profile, ->
  log.debug \modules/session/actions/get-profile

  get-profile-service!

module.exports = get-profile
