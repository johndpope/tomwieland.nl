{ connect } = require \react-redux

{ push } = require \react-router-redux

Show = require \./Show

actions = require \../../actions

module.exports = connect(
  (state) ->
    session:  state.Application.Session.session
    users:    state.Application.Admin.Users.users

  (dispatch) ->
    handle-show: (token, email) ->
      dispatch actions.fetch-one token, email

    navigate-to-list: (email) ->
      dispatch push "/admin/users"

    navigate-to-edit: (email) ->
      dispatch push "/admin/users/#{email}/edit"
) Show
