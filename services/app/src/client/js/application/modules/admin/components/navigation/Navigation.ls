React   = require \react
_       = require \lodash
log     = require \loglevel
{ map } = require \prelude-ls

el = React~create-element

{
  Nav
  NavItem
  Navbar
} = require \react-bootstrap

# Prepends a slash if it doesn't have one.
ensure-prepended-slash = (string) ->
  log.debug \modules/admin/components/Navigation.ensure-prenended-slash, string

  ((string.index-of \/) is 0) and string or "/#{string}"

class Navigation extends React.Component
  (options) ->
    log.debug \modules/admin/components/Navigation#constructor, options

    super options

    @state =
      expanded: false

  get-menu-items: ->
    log.debug \modules/admin/components/Navigation#get-menu-items

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

  get-active-top-path: ->
    # TODO: Rewrite with prelude.ls
    _ @props.routes
      # Some hrefs appear to put entries in here without a v.path.
      .filter (v) -> v.path
      .map (v) -> v.path
      .map ensure-prepended-slash
      .take 2
      .value!
      .join ''

  handle-toggle: ->
    log.debug \modules/admin/components/Navigation#handle-toggle

    @set-state do
      expanded: !@state.expanded

  handle-shrink: ->
    log.debug \modules/admin/components/Navigation#handle-shrink

    @set-state do
      expanded: false

  render-nav-items: ->
    log.debug \modules/admin/components/Navigation#render-nav-items

    active-top-path = @get-active-top-path!

    log.debug \modules/admin/components/Navigation#render-nav-items:active-top-path, active-top-path

    active-top-path-regex = new Reg-exp "^#{active-top-path}"

    log.debug \modules/admin/components/Navigation#render-nav-items:active-top-path-regex, active-top-path-regex

    menu-items = @get-menu-items!

    # Set's the correct menu entry to active.
    active-links-mapper = (item) ~>
      item.active = ((active-top-path is \/admin) and item.href is \/admin) or active-top-path-regex.test item.href
      item

    # Converts menu items into NavItem components.
    nav-item-mapper = (item, i) ~>
      el NavItem,
        key:       i + 1
        event-key: i + 1
        href:      "##{item.href}"
        active:    item.active
        on-click:  @~handle-shrink,

        item.label

    menu-items
      |> map active-links-mapper
      |> map nav-item-mapper

  render: ->
    log.debug \modules/admin/components/Navigation#render

    el Navbar,
      on-toggle: @~handle-toggle
      expanded: @state.expanded
      inverse: true
      style:
        margin-bottom: 0,

      el Navbar.Header, void,
        el Navbar.Brand, void,
          el 'a',
            href: '/admin',

            'Admin'

        el Navbar.Toggle

      el Navbar.Collapse, void,
        el Nav, void,
          @render-nav-items!

module.exports = Navigation
