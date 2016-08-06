React        = require \react
el           = React~create-element
log          = require \loglevel
react-router = require \react-router

create-element = require \../../../../../library/create-element

index-route = create-element react-router.IndexRoute
route       = create-element react-router.Route

Add       = require \./components/Add
Container = require \./components/Container
Edit      = require \./components/Edit
List      = require \./components/List
Show      = require \./components/Show

module.exports = ->
  log.debug \modules/admin/routes

  route           path: \users, component: Container, key: it.key,
    index-route                 component: List
    route         path: \add,   component: Add
    route         path: \:email,
      index-route               component: Show
      route       path: \edit,  component: Edit

      it.routes
