React           = require \react
create-element  = require \../../../../library/create-element
el              = React~create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap

col  = create-element react-bootstrap.Col
grid = create-element react-bootstrap.Grid
row  = create-element react-bootstrap.Row
div  = create-element \div

class Dashboard extends React.Component
  render: ->
    log.debug \modules/admin/components/Dashboard#render

    grid void,
      row void,
        col xs: 12,
          \Dashboard!

module.exports = Dashboard
