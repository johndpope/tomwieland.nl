React           = require \react
create-element  = require \../../../../library/create-element
el              = React~create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap

div        = create-element \div
navigation = create-element require \./Navigation

class Container extends React.Component
  render: ->
    log.debug \modules/admin/components/Container#render

    {
      children
      history
      location
      params
      route
      routeParams
      routes
    } = @props

    div void,
      navigation do
        history: history
        location: location
        params: params
        route: route
        routeParams: routeParams
        routes: routes
      children

module.exports = Container
