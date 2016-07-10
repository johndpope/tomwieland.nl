immutable          = require \immutable
log                = require \loglevel
{ handle-actions } = require \redux-actions

default-state = immutable.Map do
  is-fetching: false
  has-succeeded: true
  has-failed: false
  error: void

  entries: immutable.List!

actions =
  \admin:users:fetch:start: (state, action) ->
    log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch:start, state, action

    state
      .merge-deep do
        is-fetching: true

  \admin:users:fetch:success: (state, action) ->
    log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch:success, state, action

    state
      .merge-deep do
        is-fetching: false
        has-succeeded: true
        has-failed: false
        error: void
        entries: action.payload

  \admin:users:fetch:failure: (state, action) ->
    log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch:failure, state, action

    state
      .merge-deep do
        is-fetching: false
        has-succeeded: false
        has-failed: true
        error: action.payload
        entries: immutable.List!

module.exports = handle-actions actions, default-state
