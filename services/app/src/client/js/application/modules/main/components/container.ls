React = require \react
el    = React~create-element
log   = require \loglevel

Navigation = require \./Navigation

class Container extends React.Component
  render: ->
    log.debug \modules/main/components/Container#render

    {
      children
      history
      location
      params
      route
      routeParams
      routes
    } = @props

    el \div, void,
      el Navigation,
        history: history
        location: location
        params: params
        route: route
        routeParams: routeParams
        routes: routes,

      children

module.exports = Container
