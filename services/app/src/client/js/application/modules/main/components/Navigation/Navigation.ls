React   = require \react
_       = require \lodash
log     = require \loglevel

el = React~create-element

Navigation = require \../../../../../library/components/Navigation

class MainNavigation extends Navigation
  (options) ->
    log.debug \modules/admin/components/Navigation.MainNavigation#constructor, options

    super options

    @header-link  = \#/
    @header-label = \TomWieland.nl

  get-menu-items: ->
    log.debug \modules/admin/components/Navigation.MainNavigation#get-menu-items

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

module.exports = MainNavigation
