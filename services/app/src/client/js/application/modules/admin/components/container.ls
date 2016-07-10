React = require \react
el    = React~create-element
log   = require \loglevel

Navigation = require \./navigation

module.exports = (context) ->
  log.debug \modules/admin/components/container#render

  el 'div', void,
    el Navigation,
      history: context.history
      location: context.location
      params: context.params
      route: context.route
      route-params: context.route-params
      routes: context.routes,

    el 'div',
      style:
        margin-top: \21px,

      context.children
