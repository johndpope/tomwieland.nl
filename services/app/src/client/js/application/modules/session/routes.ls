React = require \react
el    = React~create-element
log   = require \loglevel

module.exports = (context) ->
  log.debug \modules/session/routes, context

  el \div, void, context.children
