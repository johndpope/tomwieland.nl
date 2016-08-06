React                 = require \react
el                    = React~create-element
log                   = require \loglevel
{ Route, IndexRoute } = require \react-router

UserIsAuthenticated = require \../../../library/auth/UserIsAuthenticated

Container = UserIsAuthenticated require \./components/Container
Dashboard = require \./components/Dashboard

module.exports = (context) ->
  log.debug \modules/admin/routes, context

  el Route,        { path: \admin, component: Container, key: context.key, },
    el IndexRoute, {               component: Dashboard                    }
    context.routes
