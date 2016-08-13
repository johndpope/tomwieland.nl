React           = require \react
_               = require \lodash
create-element  = require \../../create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap

{
  filter
  map
  take
  drop
  find-indices
  { join }: Str
} = require \prelude-ls

a                = create-element \a
account-dropdown = create-element require \../AccountDropdown
nav              = create-element react-bootstrap.Nav
nav-item         = create-element react-bootstrap.NavItem
navbar           = create-element react-bootstrap.Navbar
navbar-brand     = create-element react-bootstrap.Navbar.Brand
navbar-collapse  = create-element react-bootstrap.Navbar.Collapse
navbar-header    = create-element react-bootstrap.Navbar.Header
navbar-toggle    = create-element react-bootstrap.Navbar.Toggle

class Navigation extends React.Component
  (options) ->
    log.debug \library/components/Navigation.Navigation#constructor, options

    super options

    @header-label = \Navigation
    @header-link  = \#/
    @inverse      = false

    @state =
      expanded: false

  # Abstract Method
  get-menu-items: ->
    log.debug \library/components/Navigation.Navigation#get-menu-items

    []

  get-active-top-path: ->
    log.debug \library/components/Navigation.Navigation#get-active-top-path

    parts     = @props.location.pathname.split '/'
    first-two = take 2, drop 1, parts

    "/#{first-two.join '/'}"

  handle-toggle: ->
    log.debug \library/components/Navigation.Navigation#handle-toggle

    @set-state do
      expanded: !@state.expanded

  handle-shrink: ->
    log.debug \library/components/Navigation.Navigation#handle-shrink

    @set-state do
      expanded: false

  render-nav-items: ->
    log.debug \library/components/Navigation.Navigation#render-nav-items

    active-top-path = @get-active-top-path!

    log.debug \library/components/Navigation.Navigation#render-nav-items:active-top-path, active-top-path

    # Set's the correct menu entry to active.
    active-links-mapper = (item) ~>

      item

    # Converts menu items into NavItem components.
    nav-item-mapper = (item, i) ~>
      log.debug \library/components/Navigation.Navigation#render-nav-items.nav-item-mapper, item, i, arguments

      nav-item do
        key:       item.label
        event-key: item.label
        href:      "##{item.href}"
        active:    item.active
        on-click:  @~handle-shrink,

        item.label

    menu-items = @get-menu-items!

    # Count back to find the menu item to activate
    for i in [ menu-items.length - 1 to 0 by -1 ]
      item = menu-items[i]

      if (new Reg-exp "^#{active-top-path}$").test item.href
        item.active = true

    map nav-item-mapper, menu-items

  render: ->
    log.debug \library/components/Navigation.Navigation#render

    navbar do
      on-toggle: @~handle-toggle
      expanded: @state.expanded
      inverse: @inverse
      style:
        margin-bottom: 50,

      navbar-header void,
        navbar-brand void,
          a href: @header-link, @header-label
        navbar-toggle!

      navbar-collapse void,
        nav void, @render-nav-items!

        account-dropdown do
          logout:   @props.logout
          on-click: @~handle-shrink
          profile:  @props.profile
          session:  @props.session

module.exports = Navigation
