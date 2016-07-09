React = require \react
el    = React~create-element
log   = require \loglevel

{
  filter
  map
  take
} = require \prelude-ls

{
  Nav
  NavItem
  Navbar
} = require \react-bootstrap

account-dropdown = require \./account-dropdown

class Navigation extends React.Component
  (options) ->
    log.debug \modules/main/components/Navigation#constructor, options

    @state =
      expanded: false

  get-menu-items: ->
    log.debug \modules/main/components/Navigation#get-menu-items

    [
      {
        href: \/
        label: \Home
      }
      {
        href: \/about
        label: \About
      }
      {
        href: \/contact
        label: \Contact
      }
    ]

  handle-toggle: ->
    log.debug \modules/main/components/Navigation#handle-toggle
    @set-state do
      expanded: !@state.expanded

  handle-shrink: ->
    log.debug \modules/main/components/Navigation#handle-shrink
    @set-state do
      expanded: false

  render-nav-items: ->
    log.debug \modules/main/components/Navigation#render-nav-items

    current-path = @props.routes
      # Some hrefs appear to put entries in here without a v.path.
      |> filter (.path)
      |> map    (.path)

    # Take only the first two.
    active-top-path = take 2, current-path
      .join ''

    regex = new Reg-exp "^#{active-top-path}"

    # TODO: WTF! This is ugly as hell!
    i = 0

    @get-menu-items!
      |> map (v) ->
        if active-top-path is \/
          if v.href is \/
            v.active = true

            v
        else
          if regex.test v.href
            v.active = true

        v

      # TODO: Does not pass an iterator. WHY????
      |> map (v) ~>
        i++

        el NavItem,
          key: i
          event-key: i
          href: "##{v.href}"
          active: !!v.active
          on-click: @~handle-shrink,

          v.label

  render: ->
    log.debug \modules/main/components/Navigation#render

    el Navbar,
      on-toggle: @~handle-toggle
      expanded: @state.expanded
      style:
        margin-bottom: 0

      el Navbar.Header, void,
        el Navbar.Brand, void,
          el \a,
            href: "#",

            'App'

        el Navbar.Toggle

      el Navbar.Collapse, void,
        el Nav, void, @render-nav-items!

        el account-dropdown,
          on-click: @~handle-shrink

module.exports = Navigation
