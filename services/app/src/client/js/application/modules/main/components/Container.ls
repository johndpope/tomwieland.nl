React          = require \react
create-element = require \../../../../library/create-element
el             = React~create-element
log            = require \loglevel

div        = create-element \div
navigation = create-element require \./Navigation

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

    div void,
      navigation do
        history: history
        location: location
        params: params
        route-params: routeParams
        route: route
        routes: routes,

      children

module.exports = Container
