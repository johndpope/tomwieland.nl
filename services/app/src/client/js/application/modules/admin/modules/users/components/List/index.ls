{ connect } = require \react-redux

{ push } = require \react-router-redux

List = require \./List

actions = require \../../actions

module.exports = connect(
  (state) ->
    session:  state.Application.Session.session
    users:    state.Application.Admin.Users.users

  (dispatch) ->
    handle-delete: (token, id) ->
      dispatch actions.delete token, id

    handle-list: (token, skip = 0, limit = 10, order = 'username ASC') ->
      dispatch actions.fetch token, skip, limit, order

    navigate-to-show: (id) ->
      dispatch push "/admin/users/#{id}"

    navigate-to-edit: (id) ->
      dispatch push "/admin/users/#{id}/edit"

    show-delete-modal: (id) ->
      debugger

) List
