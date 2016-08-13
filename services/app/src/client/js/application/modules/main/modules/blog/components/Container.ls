React           = require \react
create-element  = require \../../../../../../library/create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap

div = create-element \div

class Container extends React.Component
  render: ->
    log.debug \modules/main/modules/blog/components/Container#render

    div style: margin-top: \21px,
      @props.children

module.exports = Container
