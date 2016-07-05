immutable = require \seamless-immutable
{ handle-actions } = require \redux-actions

default-state = immutable do
  is-logging-in: false
  is-logging-out: false

  token: void
  ttl: void
  user-id: void
  created: void

actions =
  \user:login:start: (state, action) ->
    state
      .set \is-logging-in, true
  \user:login:success: (state, action) ->
    state
      .set \is-logging-in, false
  \user:login:failure: (state, action) ->
    state
      .set \is-logging-in, false

  \user:logout:start: (state, action) ->
    state
      .set \is-logging-out, true
  \user:logout:success: (state, action) ->
    state
      .set \is-logging-out, false
  \user:logout:failure: (state, action) ->
    state
      .set \is-logging-out, false

  \user:get-cookie:start: (state, action) ->
    state
      .set \is-logging-in, true
  \user:get-cookie:success: (state, action) ->
    state
      .set \is-logging-in, false
      .set \created, action.payload.created
      .set \token, action.payload.token
      .set \ttl, action.payload.ttl
      .set \user-id, action.payload.user-id
  \user:get-cookie:failure: (state, action) ->
    default-state

  \user:set-cookie:success: (state, action) ->
    state
      .set \created, action.payload.created
      .set \token, action.payload.token
      .set \ttl, action.payload.ttl
      .set \user-id, action.payload.user-id
  \user:set-cookie:failure: (state, action) ->
    default-state

  \user:clear-cookie:success: (state, action) ->
    default-state

module.exports = handle-actions actions, default-state
