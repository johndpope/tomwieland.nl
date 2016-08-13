{ connect } = require \react-redux
{ push }    = require \react-router-redux

Component = require \./List

list = require \../../actions/list

connect-state = (state) ->
  session: state.Application.Session.session
  list:    state.Application.Main.Blog.list

connect-dispatch = (dispatch) ->
  handle-list: (token) ->
    dispatch list token

module.exports = (connect connect-state, connect-dispatch) Component
