{ connect }    = require \react-redux
{ get-values } = require \redux-form
{ push }       = require \react-router-redux
{ find }       = require \prelude-ls

Edit = require \./Edit

actions = require \../../actions

module.exports = connect(
  (state) ->
    session: state.Application.Session.session
    user:    state.Application.Admin.Users.user
    users:   state.Application.Admin.Users.users

  (dispatch) ->
    handle-edit: (token, email) ->
      const record = find (.email is email), global.store.get-state!.Application.Admin.Users.users

      debugger

      dispatch actions.fetch-one record, token, email

    handle-submit: (token) ->
      { store } = global

      const data = get-values store.get-state!.form.\admin-users-user

      dispatch actions.update token, data

    navigate-to-show: (email) ->
      dispatch push "/admin/users/#{email}"

    navigate-to-edit: (email) ->
      dispatch push "/admin/users/#{email}/edit"

    show-delete-modal: (email) ->
      debugger
) Edit
