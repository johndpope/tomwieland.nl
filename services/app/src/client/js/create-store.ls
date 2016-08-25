console.log \create-store.ls

logger-middleware     = require \redux-logger
redux-form            = require \redux-form
redux-streams         = require \redux-streams
redux-thunk           = require \redux-thunk .default
{ hash-history }      = require \react-router
{ persist-state }     = require \redux-devtools
{ router-middleware } = require \react-router-redux

{
  create-store
  combine-reducers
  apply-middleware
  compose
} = require \redux

DevTools = require \./library/components/DevTools

get-debug-session-key = ->
  matches = window.location.href.match /[?&]debug_session=([^&#]+)\b/
  matches and matches.length > 0 and matches[1] or void

middleware = [
  redux-thunk
  redux-streams
  # TODO: Problem with this middleware.
  router-middleware hash-history
  logger-middleware do
    collapsed: true
]

if window.dev-tools-extension
  middleware = compose(
    apply-middleware.apply void, middleware
    window.dev-tools-extension!
    persist-state get-debug-session-key!
  )

else
  middleware = compose(
    apply-middleware.apply void, middleware
    DevTools.instrument!
    persist-state get-debug-session-key!
  )

module.exports = (app-reducers) ->
  all-reducers = combine-reducers do
    Application:  app-reducers
    form:         redux-form.reducer

  create-store all-reducers, middleware
