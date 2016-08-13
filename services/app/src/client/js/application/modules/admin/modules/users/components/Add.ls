React           = require \react
create-element  = require \../../../../../../library/create-element
el              = React~create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap

grid   = create-element react-bootstrap.Grid
col    = create-element react-bootstrap.Col
row    = create-element react-bootstrap.Row


module.exports = (context) ->
  log.debug \modules/admin/modules/users/components/add

  grid void,
    row void,
      col xs: 12, 'Add!'
