hl                = require \highland
{ create-action } = require \redux-actions
log               = require \loglevel

initialize-service = require \../services/initialize

initialize = create-action \initialize, ->
  log.debug \actions/initialize

  output = hl!

  initialize-service!
    .pipe output

  output

module.exports = initialize
