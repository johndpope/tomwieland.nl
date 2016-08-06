{ connect } = require \react-redux

Navigation = require \./Navigation

logout-action = require \../../../session/actions/logout

select-state = (state) ->
  session: state.Application.Session.session
  profile: state.Application.Session.profile

select-dispatch = (dispatch) ->
  logout: ->
    dispatch logout-action!

module.exports = (connect select-state, select-dispatch) Navigation
