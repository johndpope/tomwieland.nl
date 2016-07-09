React = require \react
log   = require \loglevel
el = React~create-element
{
  Col
  Grid
  Row
} = require \react-bootstrap

class Contact extends React.Component
  render: ->
    log.debug \modules/main/components/Contact#render

    el Grid,
      style:
        margin-top: \21px

      el Row,
        void,

        el Col,
          xs: 12

          "Contact!"

module.exports = Contact
