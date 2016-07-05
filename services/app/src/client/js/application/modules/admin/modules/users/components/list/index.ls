{ connect } = require \react-redux

{ push } = require \react-router-redux

List = require \./List

fetch = require \../../actions/fetch

module.exports = connect(
  # TODO: Implement.
  (state) ->
    session: state.Application.Session.session
    list: state.Application.Admin.Admin-users.list.to-j-s!

  (dispatch) ->
    handle-list: (token, skip = 0, limit = 10, order = 'username ASC') -> dispatch(fetch token, skip, limit, order)
    navigate-to-show: (id) -> dispatch(push "/admin/users/#{id}")
) List
