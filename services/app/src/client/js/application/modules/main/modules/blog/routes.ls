React        = require \react
el           = React~create-element
log          = require \loglevel
react-router = require \react-router

create-element = require \../../../../../library/create-element

index-route = create-element react-router.IndexRoute
route       = create-element react-router.Route

Container = require \./components/Container
List      = require \./components/List
Show      = require \./components/Show

module.exports = ->
  log.debug \modules/blog/routes

  route           path: \blog,   component: Container, key: it.key,
    index-route                  component: List
    route         path: \:slug,
      index-route                component: Show
      it.routes
