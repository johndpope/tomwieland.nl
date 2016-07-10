React                    = require \react
el                       = React~create-element
log                      = require \loglevel
{ Provider }             = require \react-redux
{ Router, hash-history } = require \react-router

module.exports = (context) ->
  log.debug \routes, context

  el Provider,
    store: context.store
    key: context.key,

    el Router,
      history: hash-history,

      context.routes
