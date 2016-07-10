React                       = require \react
el                          = React~create-element
log                         = require \loglevel
{ Provider }                = require \react-redux
{ Router, hash-history }    = require \react-router
{ sync-history-with-store } = require \react-router-redux

module.exports = (context) ->
  log.debug \routes, context

  history = sync-history-with-store hash-history, context.store, select-location-state: (.Application.routing)

  el Provider,
    store: context.store
    key: context.key,

    el Router,
      history: history,

      context.routes
