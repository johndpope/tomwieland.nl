# Polyfill
require \whatwg-fetch

domready   = require \domready
log        = require \loglevel
{ render } = require \react-dom

log.set-level \debug

{ get-routes, get-reducers, set-store } = require \./library/module

application = require \./application
initialize-action = require \./application/actions/initialize
{ create-store } = require \./store

react-to-jsx = require \react-to-jsx

# Get all reducers.
all-reducers = get-reducers application
log.debug \all-reducers, all-reducers

# Create the store instance.
store-instance = create-store all-reducers
log.debug \store-instance, store-instance
log.debug \store-state, store-instance.get-state!

# Dispatch the initialize action
store-instance.dispatch initialize-action!

# Routes can be fetched and bound to the store.
routes = get-routes application, store-instance
log.debug \routes, react-to-jsx routes

<- domready
log.debug \dom-ready

render routes, document.query-selector \#root
