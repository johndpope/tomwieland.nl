immutable          = require \seamless-immutable
log                = require \loglevel
{ handle-actions } = require \redux-actions

default-state = immutable do
  'is-logging-in':  false
  'is-logging-out': false

  'token':          void
  'ttl':            void
  'user-id':        void
  'created':        void

module.exports = (state, action) ->
  switch action.type
    case \user:login:start
      log.debug \modules/session/reducers/session/user:login:start, state, action

      state
        .set \isLoggingIn, true

    case \user:login:success
      log.debug \modules/session/reducers/session/user:login:success, state, action

      state
        .set \isLoggingIn, false

    case \user:login:failure
      log.debug \modules/session/reducers/session/user:login:failure, state, action

      state
        .set \isLoggingIn, false

    case \user:logout:start
      log.debug \modules/session/reducers/session/user:logout:start, state, action

      state
        .set \isLoggingOut, true

    case \user:logout:success
      log.debug \modules/session/reducers/session/user:logout:success, state, action

      state
        .set \isLoggingOut, false

    case \user:logout:failure
      log.debug \modules/session/reducers/session/user:logout:failure, state, action

      state
        .set \isLoggingOut, false

    case \user:get-cookie:start
      log.debug \modules/session/reducers/session/user:get-cookie:start, state, action

      state
        .set \isLoggingIn, true

    case \user:get-cookie:success
      log.debug \modules/session/reducers/session/user:get-cookie:success, state, action

      state
        .set \isLoggingIn, false
        .set \created, action.payload.created
        .set \token, action.payload.token
        .set \ttl, action.payload.ttl
        .set \user-id, action.payload.user-id

    case \user:get-cookie:failure
      log.debug \modules/session/reducers/session/user:get-cookie:failure, state, action

      default-state

    case \user:set-cookie:success
      log.debug \modules/session/reducers/session/user:set-cookie:success, state, action

      state
        .set \created, action.payload.created
        .set \token, action.payload.token
        .set \ttl, action.payload.ttl
        .set \user-id, action.payload.user-id

    case \user:set-cookie:failure
      log.debug \modules/session/reducers/session/user:set-cookie:failure, state, action

      default-state

    case \user:clear-cookie:success
      log.debug \modules/session/reducers/session/user:clear-cookie:success, state, action

      default-state

    default
      state or default-state
