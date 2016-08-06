React        = require \react
el           = React~create-element
log          = require \loglevel
react-router = require \react-router

create-element = require \../../../../../library/create-element

IndexRoute = create-element react-router.IndexRoute
Route      = create-element react-router.Route
Container  = create-element require \./components/Container
List       = create-element require \./components/List

module.exports = (context) ->
  log.debug \modules/blog/routes, context

  #Route        { path: \blog, component: Container, key: context.key },
  #  IndexRoute {              component: List                        }

  context.routes

/*

el \div, void, 'foo'

div void, 'foo'

div 'foo'

*/
