hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

get-profile-start   = create-action \user:get-profile:start
get-profile-success = create-action \user:get-profile:success
get-profile-failure = create-action \user:get-profile:failure

{ User } = global.loopback-application.models

module.exports = (token, user-id) ->
  log.debug \modules/session/services/get-profile

  output = hl!
  output.write get-profile-start!

  debugger
  User.find-one { token: token, id: user-id }, (error, result) !->
    if error
      output.write get-profile-failure error
      return

    output.write get-profile-success result

  output
