React = require \react
el = React~create-element

module.exports = (context) ->
  el div, null,
    el div,
      style:
        margin-top: \21px,

      context.children
