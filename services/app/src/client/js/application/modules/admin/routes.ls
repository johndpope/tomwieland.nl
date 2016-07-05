React = require \react
el = React~create-element
{ Route, IndexRoute } = require \react-router

container = require \./components/container
dashboard = require \./components/dashboard

module.exports = (context) ->
  el Route,
    path: '/admin'
    component: container
    key: context.key,

    el IndexRoute,
      component: dashboard,

      context.routes
