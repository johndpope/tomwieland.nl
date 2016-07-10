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

Navigation = require \../../../../../library/components/Navigation
account-dropdown = require \../../../../../library/components/account-dropdown

class AdminNavigation extends Navigation
  (options) ->
    log.debug \modules/admin/components/Navigation.AdminNavigation#constructor, options

    super options

    @header-link  = \#/admin
    @header-label = \Admin
    @inverse      = true

  get-menu-items: ->
    log.debug \modules/admin/components/Navigation.AdminNavigation#get-menu-items

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

module.exports = AdminNavigation
