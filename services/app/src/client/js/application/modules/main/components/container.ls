React = require \react
el    = React~create-element
log   = require \loglevel

Navigation = require \./navigation

class Container extends React.Component
  render: ->
    log.debug 'Container#render'

    {
      children
      history
      location
      params
      route
      routeParams
      routes
    } = @props

    el \div, null,
      el Navigation,
        history: history
        location: location
        params: params
        route: route
        routeParams: routeParams
        routes: routes,

      children

module.exports = Container
