React        = require \react
el           = React~create-element
log          = require \loglevel
react-router = require \react-router

create-element = require \../../../library/create-element

index-route = create-element react-router.IndexRoute
route       = create-element react-router.Route

UserIsAuthenticated = require \../../../library/auth/UserIsAuthenticated

Container = UserIsAuthenticated require \./components/Container
Dashboard = require \./components/Dashboard

module.exports = ->
  log.debug \modules/admin/routes

  route         path: \admin, component: Container, key: it.key,
    index-route               component: Dashboard

    it.routes
