immutable = require \seamless-immutable
{ handle-actions } = require \redux-actions

default-state = immutable do
  is-fetching: false

  id: void
  username: void
  email: void

actions =
  \user:get-profile:start: (state, action) ->
    state
      .set \is-fetching, true

  \user:get-profile:success: (state, action) ->
    state
      .set \is-fetching, false
      .set \id, action.payload.id
      .set \username, action.payload.username
      .set \email, action.payload.email

  \user:get-profile:failure: (state, action) ->
    default-state

module.exports = handle-actions actions, default-state
