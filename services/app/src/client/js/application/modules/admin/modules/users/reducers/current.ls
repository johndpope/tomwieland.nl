immutable          = require \seamless-immutable
log                = require \loglevel
{ handle-actions } = require \redux-actions

default-state = immutable do
  is-fetching: false
  has-succeeded: true
  has-failed: false
  error: void

  entry: void

module.exports = (state, action) ->
  switch action.type
    case \admin:users:fetch-one:start
      log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch-one:start, state, action

      state
        .merge do
          is-fetching: true

    case \admin:users:fetch-one:success
      log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch-one:success, state, action

      state
        .merge do
          is-fetching: false
          has-succeeded: true
          has-failed: false
          error: void
          entry: immutable action.payload

    case \admin:users:fetch-one:failure
      log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch-one:failure, state, action

      state
        .merge do
          is-fetching: false
          has-succeeded: false
          has-failed: true
          error: immutable action.payload
          entry: void

    default
      state or default-state
