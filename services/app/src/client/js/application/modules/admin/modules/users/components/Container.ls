React = require \react
el    = React~create-element
log   = require \loglevel

module.exports = (context) ->
  log.debug \modules/admin/modules/users/components/container

  el \div, void,
    el \div,
      style:
        margin-top: \21px,

      context.children
