{ connect } = require \react-redux
{ push }    = require \react-router-redux

Component = require \./Show

show = require \../../actions/show

connect-state = (state) ->
  session: state.Application.Session.session
  show:    state.Application.Main.Blog.show

connect-dispatch = (dispatch) ->
  handle-show: (token, slug) ->
    dispatch show token, slug

  handle-redirect-to-previous: ->
    window.history.back!

  handle-redirect-to-list: ->
    dispatch push "/blog"

module.exports = (connect connect-state, connect-dispatch) Component
