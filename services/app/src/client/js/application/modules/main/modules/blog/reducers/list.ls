immutable          = require \seamless-immutable
log                = require \loglevel
moment             = require \moment
{ handle-actions } = require \redux-actions

{
  map
  foldl
} = require \prelude-ls

default-state = immutable do
  entries:        []
  error:          void
  has-failed:     false
  has-succeeded:  false
  is-fetching:    false

module.exports = (state, action) ->
  switch action.type
    case \@@router/LOCATION_CHANGE
      log.debug \modules/main/modules/blog/reducers/@@router/LOCATION_CHANGE, state, action

      default-state

    case \main:blog:list:start
      log.debug \modules/main/modules/blog/reducers/main:blog:list:start, state, action

      default-state
        .merge do
          is-fetching: true

    case \main:blog:list:success
      log.debug \modules/main/modules/blog/reducers/main:blog:show:success, state, action

      default-state
        .merge do
          entries:        action.payload
          has-succeeded:  true

    case \main:blog:list:failure
      log.debug \modules/main/modules/blog/reducers/main:blog:list:failure, state, action

      default-state
        .merge do
          error:       action.payload
          has-failed:  true

    default
      state or default-state
