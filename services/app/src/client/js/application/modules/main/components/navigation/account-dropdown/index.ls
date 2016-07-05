{ connect } = require \react-redux

logout = require \../../../../session/actions/logout
account-dropdown = require \./account-dropdown

module.exports = connect(
  (state) ->
    session: state.Application.Session.session
    profile: state.Application.Session.profile

  (dispatch) ->
    logout: (token) -> dispatch logout token
) account-dropdown
