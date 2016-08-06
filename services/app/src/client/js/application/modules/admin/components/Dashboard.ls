React = require \react
el    = React~create-element
log   = require \loglevel

{
  Col
  Grid
  Row
} = require \react-bootstrap

class Dashboard extends React.Component
  render: ->
    log.debug \modules/admin/components/Dashboard#render
    el Grid, void,
      el Row, void,
        el Col,
          xs: 12,

          'Dashboard!'

module.exports = Dashboard
