React                 = require \react
el                    = React~create-element
log                   = require \loglevel
{ Route, IndexRoute } = require \react-router

about     = require \./components/about
contact   = require \./components/contact
container = require \./components/container
Home      = require \./components/Home
login     = require \./components/login

module.exports = (context) ->
  log.debug \modules/main/routes, context

  el Route,
    path: '/',
    component: container,
    key: context.key,

    el IndexRoute,
      component: Home

    el Route,
      path: \about
      component: about

    el Route,
      path: \contact
      component: contact

    el Route,
      path: \login
      component: login
