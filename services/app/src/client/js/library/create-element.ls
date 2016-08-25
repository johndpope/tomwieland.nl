React       = require \react
log         = require \loglevel
{ is-type } = require \prelude-ls

is-undefined     = (x) -> is-type \Undefined, x
is-object        = (x) -> is-type \Object, x
is-react-element = (x) -> x?.$$typeof is Symbol React.element

create-element = (element) ->
  (options, ...rest) ->
    if is-undefined options
      options = {}
    else if is-object options
      if is-react-element options
        rest    = [ options ].concat rest
        options = {}
    else
      rest    = [ options ].concat rest
      options = {}

    React.create-element element, options, ...rest

module.exports = create-element
