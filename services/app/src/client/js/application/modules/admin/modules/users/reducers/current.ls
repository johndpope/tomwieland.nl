immutable          = require \immutable
log                = require \loglevel
{ handle-actions } = require \redux-actions

default-state = immutable.Map do
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
        .set \is-fetching, true

    case \admin:users:fetch-one:success
      log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch-one:success, state, action

      state
        .set \is-fetching, false
        .set \has-succeeded, true
        .set \has-failed, false
        .set \error, void
        .set \entry, immutable.from-j-s(action.payload)

    case \admin:users:fetch-one:failure
      log.debug \modules/admin/modules/user/reducers/current:admin:users:fetch-one:failure, state, action

      state
        .set \is-fetching, false
        .set \has-succeeded, false
        .set \has-failed, true
        .set \error, immutable.from-j-s(action.payload)

    default
      state or default-state
