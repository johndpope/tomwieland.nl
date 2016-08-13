React = require \react
log   = require \loglevel

# TODO: Make the options parameter optional. Check if it is an Object and not
# instanceof React.Component

module.exports = (component) ->
  React.create-element.bind React, component
