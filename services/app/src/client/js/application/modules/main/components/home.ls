React = require \react
el = React~create-element
log = require \loglevel

{
  Col
  Grid
  Row
} = require \react-bootstrap

class Home extends React.Component
  render: ->
    log.debug 'Home#render'

    el Grid,
      style:
        margin-top: \21px

      el Row, void
        el Col,
          xs: 12

          \Home23!

module.exports = Home
