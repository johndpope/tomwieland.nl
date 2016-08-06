{ connect } = require \react-redux

{ push } = require \react-router-redux

Home = require \./Home

blogposts-fetch = require \../../actions/blogposts-fetch

module.exports = connect(
  (state) ->
    session:   state.Application.Session.session
    blogposts: state.Application.Main.blogposts

  (dispatch) ->
    handle-list: (token, skip = 0, limit = 10, order = 'created DESC') ->
      dispatch blogposts-fetch token, skip, limit, order

    navigate-to-show: (id) ->
      dispatch push "/blog/#{id}"
) Home
