React   = require \react
{ map } = require \prelude-ls

el = React~create-element

{
  Nav
  NavItem
  Navbar
} = require \react-bootstrap

# Prepends a slash if it doesn't have one.
ensure-prepended-slash = (string) ->
  if (string.index-of \/) is 0
    string

  "/#{string}"

class Navigation extends React.Component
  (options) ->
    super options

    @state =
      expanded: false

  get-menu-items: ->
    [
      {
        href: \/admin
        label: \Dashboard
      }
      {
        href: \/admin/users
        label: \Users
      }
      {
        href: \/admin/access
        label: \Access
      }
    ]

  handle-toggle: ->
    @set-state do
      expanded: !@state.expanded

  handle-shrink: ->
    @set-state do
      expanded: false

  render-nav-items: ->
    active-top-path = _ @props.routes
      # Some hrefs appear to put entries in here without a v.path.
      .filter (v) -> v.path
      .map (v) -> v.path
      .map ensure-prepended-slash
      .take 2
      .value!
      .join ''

    active-top-path-regex = new Reg-exp "^#{active-top-path}"

    @get-menu-items!
      |> map (v) ->
        if active-top-path is \/admin
          if v.href is \/admin
            v.active = true

            v
        else
          if active-top-path-regex.test v.href
            v.active = true

        v

      |> map (v, i) ->
        el NavItem,
          key: i + 1
          event-key: i + 1
          href: "##{v.href}"
          active: !!v.active
          on-click: @~handle-shrink,

          v.label

  render: ->
    el Navbar,
      on-toggle: @~handle-toggle
      expanded: @state.expanded
      inverse: true
      style:
        margin-bottom: 0,

      el Navbar.Header, null,
        el Navbar.Brand, null,
          el 'a',
            href: '/admin',

            'Admin'

        el Navbar.Toggle

      el Navbar.Collapse, null,
        el Nav, null,
          @render-nav-items!

module.exports = Navigation
