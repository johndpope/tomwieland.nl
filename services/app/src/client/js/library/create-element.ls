React = require \react
log   = require \loglevel

module.exports = (component) ->
  React.create-element.bind React, component
