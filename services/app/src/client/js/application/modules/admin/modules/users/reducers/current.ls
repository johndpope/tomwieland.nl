immutable          = require \immutable
log                = require \loglevel
{ handle-actions } = require \redux-actions

default-state = immutable.Map do
  is-fetching: false
  has-succeeded: true
  has-failed: false
  error: void

  entry: void

actions =
  \admin:users:fetch-one:start: (state, action) ->
    log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch-one:start, state, action

    state
      .set \is-fetching, true

  \admin:users:fetch-one:success: (state, action) ->
    log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch-one:success, state, action

    state
      .set \is-fetching, false
      .set \has-succeeded, true
      .set \has-failed, false
      .set \error, void
      .set \entry, immutable.from-j-s(action.payload)

  \admin:users:fetch-one:failure: (state, action) ->
    log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch-one:failure, state, action

    state
      .set \is-fetching, false
      .set \has-succeeded, false
      .set \has-failed, true
      .set \error, immutable.from-j-s(action.payload)

module.exports = handle-actions actions, default-state
