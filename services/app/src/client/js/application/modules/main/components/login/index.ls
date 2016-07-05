{ connect } = require \react-redux

Login = require \./Login

login = require \../../../session/actions/login

module.exports = connect(
  (state) ->
    session: state.Application.Session.session
    profile: state.Application.Session.profile

  (dispatch) ->
    handle-login: (email, password) -> dispatch(login email, password)
) Login
