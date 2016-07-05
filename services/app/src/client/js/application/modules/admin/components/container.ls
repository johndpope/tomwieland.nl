React = require \react
el = React~create-element

Navigation = require \./navigation

module.exports = (context) ->
  el 'div', null,
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
