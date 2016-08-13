immutable          = require \seamless-immutable
log                = require \loglevel
moment             = require \moment
{ handle-actions } = require \redux-actions

{
  map
  foldl
} = require \prelude-ls

default-state = immutable do
  is-fetching:    false
  has-succeeded:  false
  has-failed:     false
  error:          void
  entry:          void

module.exports = (state, action) ->
  switch action.type
    case \@@router/LOCATION_CHANGE
      log.debug \modules/main/modules/blog/reducers/@@router/LOCATION_CHANGE, state, action

      default-state

    case \main:blog:show:start
      log.debug \modules/main/modules/blog/reducers/show:modules:blog:show:start, state, action

      default-state
        .merge do
          is-fetching:    true

    case \main:blog:show:success
      log.debug \modules/main/modules/blog/reducers/show:modules:blog:show:success, state, action

      default-state
        .merge do
          is-fetching:    false
          has-succeeded:  true
          has-failed:     false
          error:          void
          entry:          action.payload.0

    case \main:blog:show:failure
      log.debug \modules/main/modules/blog/reducers/show:modules:blog:show:failure, state, action

      default-state
        .merge do
          is-fetching:    false
          has-succeeded:  false
          has-failed:     true
          error:          action.payload
          entry:          void

    default
      state or default-state
