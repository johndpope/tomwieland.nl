immutable          = require \immutable
log                = require \loglevel
{ handle-actions } = require \redux-actions

default-state = immutable.Map do
  is-fetching: false
  has-succeeded: true
  has-failed: false
  error: void

  entries: immutable.List!

module.exports = (state, action) ->
  switch action.type
    case \admin:users:fetch:start
      log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch:start, state, action

      state
        .merge-deep do
          is-fetching: true

    case \admin:users:fetch:success
      log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch:success, state, action

      state
        .merge-deep do
          is-fetching: false
          has-succeeded: true
          has-failed: false
          error: void
          entries: action.payload

    case \admin:users:fetch:failure
      log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch:failure, state, action

      state
        .merge-deep do
          is-fetching: false
          has-succeeded: false
          has-failed: true
          error: action.payload
          entries: immutable.List!

    default
      state or default-state
