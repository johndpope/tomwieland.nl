React        = require \react
el           = React~create-element
log          = require \loglevel
react-router = require \react-router

create-element = require \../../../library/create-element

index-route = create-element react-router.IndexRoute
route      = create-element react-router.Route

About      = require \./components/About
Contact    = require \./components/Contact
Container  = require \./components/Container
Home       = require \./components/Home
Login      = require \./components/Login

module.exports = (context) ->
  log.debug \modules/main/routes, context

  route         path: '/',      component: Container, key: context.key,
    index-route                 component: Home
    route       path: \about,   component: About
    route       path: \contact, component: Contact
    route       path: \login,   component: Login

    context.routes
