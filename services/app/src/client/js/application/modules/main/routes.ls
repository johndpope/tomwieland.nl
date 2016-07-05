React = require \react
el = React~create-element
{ Route, IndexRoute } = require \react-router
log = require \loglevel

about     = require \./components/about
contact   = require \./components/contact
container = require \./components/container
home      = require \./components/home
login     = require \./components/login

module.exports = (context) ->
  log.debug 'main/routes', context

  el Route, { path: '/', component: container, key: context.key },
    el IndexRoute, {                 component: home    }
    el Route,      { path: \about,   component: about   }
    el Route,      { path: \contact, component: contact }
    el Route,      { path: \login,   component: login   }
