immutable          = require \seamless-immutable
log                = require \loglevel
{ handle-actions } = require \redux-actions

default-state = immutable do
  is-fetching: false
  has-succeeded: true
  has-failed: false
  error: void

  entries: []

module.exports = (state, action) ->
  switch action.type
    case \main:blogposts:fetch:start
      log.debug \modules/admin/modules/main/reducers/blog:blogposts:fetch:start, state, action

      state
        .merge do
          is-fetching: true

    case \main:blogposts:fetch:success
      log.debug \modules/admin/modules/main/reducers/blog:blogposts:fetch:success, state, action

      state
        .merge do
          is-fetching: false
          has-succeeded: true
          has-failed: false
          error: void
          entries: action.payload

    case \main:blogposts:fetch:failure
      log.debug \modules/admin/modules/main/reducers/blog:blogposts:fetch:failure, state, action

      state
        .merge do
          is-fetching: false
          has-succeeded: false
          has-failed: true
          error: action.payload
          entries: []

    default
      state or default-state
