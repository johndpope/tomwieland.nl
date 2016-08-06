{ connect } = require \react-redux

{ push } = require \react-router-redux

List = require \./List

fetch = require \../../actions/fetch

module.exports = connect(
  (state) ->
    session: state.Application.Session.session
    list:    state.Application.Admin.AdminUsers.list

  (dispatch) ->
    handle-list: (token, skip = 0, limit = 10, order = 'username ASC') ->
      dispatch fetch token, skip, limit, order

    navigate-to-show: (id) ->
      dispatch push "/admin/users/#{id}"
) List
