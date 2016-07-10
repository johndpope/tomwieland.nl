React                 = require \react
el                    = React~create-element
log                   = require \loglevel
{ Route, IndexRoute } = require \react-router

container = require \./components/container
dashboard = require \./components/dashboard

module.exports = (context) ->
  log.debug \modules/admin/routes, context

  el Route,
    path:      \admin
    component: container
    key:       context.key,

    el IndexRoute,
      component: dashboard

    context.routes
