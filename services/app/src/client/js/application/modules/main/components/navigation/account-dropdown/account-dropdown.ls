React = require \react
el = React~create-element
Loader = require \react-loader
{
  Glyphicon
  Nav
  NavDropdown
  NavItem
  NavItem
} = require \react-bootstrap

handle-click-logout = (props, event) -->
  event.prevent-default!

  props.logout props.session.token, (error) ->
    if error
      # TODO: erm.
      return

    if props.on-click
      props.on-click event

render-logged-out = (props) ->
  el Nav,
    pull-right: true,

    el NavItem,
      event-key: 4
      href: '#/login'
      on-click: props.on-click,

      'Log in'

render-logged-in = (props) ->
  { profile } = props

  el Nav,
    pull-right: true,

    el NavDropdown,
      event-key: 4
      title: title
      id: 'basic-nav-dropdown',

      el MenuItem,
        event-key: 4.1
        href: "#/admin",

        'Admin'

      el MenuItem,
        event-key: 4.2
        on-click: handle-click-logout props,

        'Log out'

render-loading = ->
  el Nav,
    pull-right: true,

    el NavItem,
      event-key: 4
      style:
        margin-top: \10px,

      el Loader,
        loaded: false
        scale: 0.5
        color: \#ffffff

class AccountDropdown extends React.Component
  render: ->
    { session, profile } = @props

    is-loading = session?.is-logging-in or session?.is-logging-out or profile?.is-fetching

    if is-loading
      render-loading @props
    else if session && session.token
      render-logged-in @props
    else
      render-logged-out @props

module.exports = AccountDropdown
