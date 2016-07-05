{ connect } = require \react-redux

Navigation = require \./Navigation

selectState = (state) ->
  session: state.Application.Session.session
  profile: state.Application.Session.profile

selectDispatch = (dispatch) ->
  {}

module.exports = (connect selectState, selectDispatch) Navigation
