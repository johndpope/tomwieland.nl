React = require \react
el    = React~create-element
log   = require \loglevel

{
  Col
  Grid
  Row
} = require \react-bootstrap

module.exports = (context) ->
  log.debug \modules/admin/modules/users/components/edit

  el Grid, void,
    el Row, void,
      el Col,
        xs: 12,

        'Edit!'
