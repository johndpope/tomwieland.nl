# Polyfill
require \whatwg-fetch

domready     = require \domready
log          = require \loglevel
react-to-jsx = require \react-to-jsx
{ render }   = require \react-dom

application       = require \./application
initialize-action = require \./application/actions/initialize
{ create-store }  = require \./store

{
  get-reducers
  get-routes
  set-store
} = require \./library/module

{ loopback-application } = global

log.set-level \debug

log.debug \loopback-application, loopback-application

# Get all reducers.
all-reducers = get-reducers application
log.debug \all-reducers, all-reducers

# Create the store instance.
store-instance = create-store all-reducers
log.debug \store-instance, store-instance
log.debug \store-state, store-instance.get-state!

routes = get-routes application, store-instance
log.debug \routes, react-to-jsx routes

store-instance.subscribe !->
  state = store-instance.get-state!

  if state?.Application?.initialize?.has-succeeded
    <- domready
    render routes, document.query-selector \#root

# Dispatch the initialize action
store-instance.dispatch initialize-action!
