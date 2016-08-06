React           = require \react
log             = require \loglevel

Navigation = require \../../../../../library/components/Navigation

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
