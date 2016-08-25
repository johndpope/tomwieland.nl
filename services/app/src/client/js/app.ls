# Polyfill
require \whatwg-fetch

domready   = require \domready
log        = require \loglevel
{ render } = require \react-dom

application       = require \./application
create-store      = require \./create-store
initialize-action = require \./application/actions/initialize

{
  get-reducers
  get-routes
} = require \./library/module

{ loopback-application } = global

reducers = global.reducers = get-reducers application
store    = global.store    = create-store reducers
routes   = global.routes   = get-routes application, store

store.subscribe !->
  state = store.get-state!

  if state?.Application?.initialize?.has-succeeded
    <- domready
    render routes, document.query-selector \#root

# Dispatch the initialize action
store.dispatch initialize-action!
