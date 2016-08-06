React                       = require \react
el                          = React~create-element
log                         = require \loglevel
react-redux                 = require \react-redux
react-router                = require \react-router
{ sync-history-with-store } = require \react-router-redux

create-element = require \../library/create-element

provider = create-element react-redux.Provider
router   = create-element react-router.Router

module.exports = ->
  log.debug \routes

  history = sync-history-with-store react-router.hash-history, it.store, select-location-state: (.Application.routing)

  provider do
    store: it.store
    key: it.key,

    router do
      history: history,

      it.routes
