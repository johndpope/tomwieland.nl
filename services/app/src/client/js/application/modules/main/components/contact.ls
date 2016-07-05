React = require \react
el = React~create-element
{
  Col
  Grid
  Row
} = require \react-bootstrap

class Contact extends React.Component
  render: ->
    el Grid,
      style:
        margin-top: \21px

      el Row,
        void,

        el Col,
          xs: 12

          "Contact!"

module.exports = Contact
