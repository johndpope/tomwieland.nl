React   = require \react
_       = require \lodash
log     = require \loglevel

{
  filter
  map
  take
  { join }: Str
} = require \prelude-ls

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
    log.debug \modules/admin/components/Navigation#get-active-top-path

    @props.routes
      |> filter (.path)
      |> map    (.path)
      |> map    ensure-prepended-slash
      |> take   2
      |> join   ''

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

    # Set's the correct menu entry to active.
    active-links-mapper = (item) ~>
      if active-top-path is \/admin
        item.active = item.href is \/admin
      else
        item.active = (new Reg-exp "^#{active-top-path}$").test item.href

      item

    # Converts menu items into NavItem components.
    nav-item-mapper = (item, i) ~>
      log.debug \modules/admin/components/Navigation#render-nav-items.nav-item-mapper, item, i, arguments

      el NavItem,
        key:       item.label
        event-key: item.label
        href:      "##{item.href}"
        active:    item.active
        on-click:  @~handle-shrink,

        item.label

    @get-menu-items!
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
            href: '#/admin',

            'Admin'

        el Navbar.Toggle

      el Navbar.Collapse, void,
        el Nav, void,
          @render-nav-items!

module.exports = Navigation
