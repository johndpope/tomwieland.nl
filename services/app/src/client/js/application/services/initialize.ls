hl                = require \highland
log               = require \loglevel
{ create-action } = require \redux-actions

get-cookie-service = require \../modules/session/services/get-cookie

initialize-start   = create-action \initialize:start
initialize-success = create-action \initialize:success
initialize-failure = create-action \initialize:failure

module.exports = initialize = ->
  log.debug \services/initialize

  output = hl!

  output.write initialize-start!

  get-cookie-service!
    .each output~write
    .done ->
      output.write initialize-success!
      output.end!

  output
