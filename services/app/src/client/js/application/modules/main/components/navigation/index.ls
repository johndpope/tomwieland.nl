{ connect } = require \react-redux

navigation = require \./navigation

module.exports = connect(
  (state) ->
    session: state.Application.Session.session
    profile: state.Application.Session.profile

  (dispatch) -> {}
) navigation
