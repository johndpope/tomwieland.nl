immutable = require \immutable
{ handle-actions } = require \redux-actions

default-state = immutable.Map do
  is-fetching: false
  has-succeeded: true
  has-failed: false
  error: null

  entries: immutable.List!

actions =
  \admin:users:fetch:start: (state, action) ->
    state
      .merge-deep do
        is-fetching: true

  \admin:users:fetch:success: (state, action) ->
    state
      .merge-deep do
        is-fetching: false
        has-succeeded: true
        has-failed: false
        error: null
        entries: action.payload

  \admin:users:fetch:failure: (state, action) ->
    state
      .merge-deep do
        is-fetching: false
        has-succeeded: false
        has-failed: true
        error: action.payload
        entries: immutable.List!

module.exports = handle-actions actions, default-state
