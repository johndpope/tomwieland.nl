hl = require \highland
{ create-action } = require \redux-actions

get-cookie = require \../modules/session/services/get-cookie

initialize-start = create-action \initialize:start
initialize-success = create-action \initialize:success
initialize-failure = create-action \initialize:failure

module.exports = initialize = ->
  output = hl!

  output.write initialize-start!

  output.write initialize-success!

  get-cookie!
    .each output~write
    .done ->
      output.end!

  output
