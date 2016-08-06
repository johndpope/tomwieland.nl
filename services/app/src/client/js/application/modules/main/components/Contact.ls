React           = require \react
create-element  = require \../../../../library/create-element
el              = React~create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap

col  = create-element react-bootstrap.Col
grid = create-element react-bootstrap.Grid
row  = create-element react-bootstrap.Row

class Contact extends React.Component
  render: ->
    log.debug \modules/main/components/Contact#render

    grid style: margin-top: \21px,
      row void,
        col xs: 12,
          \Contact!

module.exports = Contact