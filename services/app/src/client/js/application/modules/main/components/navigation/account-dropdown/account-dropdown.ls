Loader = require \react-loader
React  = require \react
el     = React~create-element
log    = require \loglevel

{
  Glyphicon
  Nav
  NavDropdown
  NavItem
  NavItem
  MenuItem
} = require \react-bootstrap

handle-click-logout = (props, event) -->
  log.debug \modules/main/components/navigation/account-dropdown/handle-click-logout

  event.prevent-default!

  props.logout props.session.token, (error) ->
    if error
      # TODO: erm.
      return

    if props.on-click
      props.on-click event

render-logged-out = (props) ->
  log.debug \modules/main/components/navigation/account-dropdown/render-logged-out

  el Nav,
    pull-right: true,

    el NavItem,
      event-key: 4
      href: '#/login'
      on-click: props.on-click,

      'Log in'

render-logged-in = (props) ->
  log.debug \modules/main/components/navigation/account-dropdown/render-logged-in

  { profile } = props

  el Nav,
    pull-right: true,

    el NavDropdown,
      event-key: 4
      title: profile.username
      id: 'basic-nav-dropdown',

      el MenuItem,
        event-key: 4.1
        href: "#/admin",

        'Admin'

      el MenuItem,
        event-key: 4.2
        on-click: handle-click-logout props

        'Log out'

render-loading = ->
  log.debug \modules/main/components/navigation/account-dropdown/render-loading

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
    log.debug \modules/main/components/navigation/account-dropdown/AccountDropdown#render

    { session, profile } = @props

    if session?.is-logging-in or session?.is-logging-out
      render-loading @props
    else if session && session.token
      render-logged-in @props
    else
      render-logged-out @props

module.exports = AccountDropdown
