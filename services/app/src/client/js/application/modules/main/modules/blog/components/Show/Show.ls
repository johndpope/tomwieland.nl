React           = require \react
create-element  = require \../../../../../../../library/create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap

button = create-element react-bootstrap.Button
col    = create-element react-bootstrap.Col
grid   = create-element react-bootstrap.Grid
h1     = create-element \h1
loader = create-element require \react-loader
p      = create-element \p
a      = create-element \a
div    = create-element \div
row    = create-element react-bootstrap.Row

class Show extends React.Component
  component-will-mount: ->
    { slug } = @props.params
    { token } = @props.session

    log.debug \modules/main/modules/blog/components/Show#component-will-mount, token, slug

    @props.handle-show token, slug

  render-loader: ->
    log.debug \modules/main/modules/blog/components/Show#render-loaded

    div void ''

    #loader do
    #  color:   \#000000
    #  loaded:  false

  render-succeeded: ->
    log.debug \modules/main/modules/blog/components/Show#render-succeeded

    { entry } = @props.show

    grid void,
      row void,
        col xs: 12,
          button on-click: @props.handle-redirect-to-previous, "< Back"

      row void,
        col xs: 12,
          h1 void, entry.title
          p void, entry.body

  render: ->
    log.debug \modules/main/modules/blog/components/Show#render, @props

    if @props.show.is-fetching
      @render-loader!
    else if @props.show.has-succeeded
      @render-succeeded!
    else if @props.show.has-failed
      @props.handle-redirect-to-list!
    else
      @render-loader!

module.exports = Show
