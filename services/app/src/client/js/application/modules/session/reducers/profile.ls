immutable          = require \seamless-immutable
log                = require \loglevel
{ handle-actions } = require \redux-actions

default-state = immutable do
  is-fetching: false

  id:          void
  username:    void
  email:       void

module.exports = (state, action) ->
  switch action.type
    case \user:get-profile:start
      log.debug \modules/session/reducers/profile/user:get-profile:start, state, action

      state
        .merge do
          is-fetching: true

    case \user:get-profile:failure
      log.debug \modules/session/reducers/profile/user:get-profile:failure, state, action

      default-state

    case \user:get-profile:success
      log.debug \modules/session/reducers/profile/user:get-profile:success, state, action

      {
        email
        id
        username
      } = action.payload

      state
        .merge do
          is-fetching: false
          id:          id
          email:       email
          username:    username

    case \user:logout:success
      log.debug \modules/session/reducers/profile/user:logout:success, state, action

      default-state

    default
      state or default-state
