hl = require \highland
{ create-action } = require \redux-actions

initialize-service = require \../services/initialize

initialize = create-action \initialize, ->
  output = hl!

  initialize-service!
    .pipe output

  output

module.exports = initialize
