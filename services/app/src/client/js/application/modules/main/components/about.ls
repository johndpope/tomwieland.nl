React = require \react
el = React~create-element
{
  Col
  Grid
  Row
} = require \react-bootstrap

class About extends React.Component
  render: ->
    el Grid,
      style:
        margin-top: \21px

      el Row,
        void,

        el Col,
          xs: 12

          "About!"

module.exports = About
