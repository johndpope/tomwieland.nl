{ connect } = require \react-redux

{ push } = require \react-router-redux

Home = require \./Home

list = require \../../modules/blog/actions/list

module.exports = connect(
  (state) ->
    session:   state.Application.Session.session
    blogposts: state.Application.Main.Blog.list

  (dispatch) ->
    handle-list: (token, skip = 0, limit = 10, order = 'created DESC') ->
      dispatch list token, skip, limit, order

    navigate-to-show: (id) ->
      dispatch push "/blog/#{id}"
) Home
