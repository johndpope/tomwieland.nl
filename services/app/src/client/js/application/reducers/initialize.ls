immutable          = require \seamless-immutable
log                = require \loglevel
{ handle-actions } = require \redux-actions

default-state = immutable do
  is-initializing: false
  has-succeeded:   false
  has-failed:      false
  error:           void

module.exports = (state, action) ->
  switch action.type
    case \initialize:start
      log.debug \reducers/initialize/initialize:start, state, action

      state
        .set \isInitializing, true

    case \initialize:failure
      log.debug \reducers/initialize/initialize:failure, state, action

      state
        .merge do
          is-fetching: false
          has-succeeded: false
          has-failed: true
          error: immutable action.payload

    case \initialize:success
      log.debug \reducers/initialize/initialize:success, state, action

      state
        .merge do
          is-fetching: false
          has-succeeded: true
          has-failed: false
          error: void

    default
      state or default-state
