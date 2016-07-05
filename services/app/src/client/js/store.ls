#logger-middleware = require \redux-logger
redux-streams = require \redux-streams
{ create-store, combine-reducers, apply-middleware, compose } = require \redux
{ hash-history } = require \react-router
{ persist-state } = require \redux-devtools
{ router-middleware } = require \react-router-redux

DevTools = require \./library/components/DevTools

get-debug-session-key = ->
  matches = window.location.href.match /[?&]debug_session=([^&#]+)\b/
  matches and matches.length > 0 and matches[1] or null

middleware = [
  redux-streams
  # TODO: Problem with this middleware.
  #logger-middleware do
  #  collapsed: true
  router-middleware hash-history
]

if window.dev-tools-extension
  middleware = compose(
    apply-middleware.apply null, middleware
    window.dev-tools-extension!
    persist-state get-debug-session-key!
  )

else
  middleware = compose(
    apply-middleware.apply null, middleware
    DevTools.instrument!
    persist-state get-debug-session-key!
  )

exports.create-store = (app-reducers) ->
  all-reducers = combine-reducers do
    Application: app-reducers

  create-store all-reducers, middleware
