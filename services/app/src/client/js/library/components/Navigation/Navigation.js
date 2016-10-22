import React from 'react'
import _ from 'lodash'
import createElement from '../../create-element'
import reactBootstrap from 'react-bootstrap'
import ref$ from 'prelude-ls'

const a = createElement('a')
const accountDropdown = createElement(require('../AccountDropdown'))
const nav = createElement(reactBootstrap.Nav)
const navItem = createElement(reactBootstrap.NavItem)
const navbar = createElement(reactBootstrap.Navbar)
const navbarBrand = createElement(reactBootstrap.Navbar.Brand)
const navbarCollapse = createElement(reactBootstrap.Navbar.Collapse)
const navbarHeader = createElement(reactBootstrap.Navbar.Header)
const navbarToggle = createElement(reactBootstrap.Navbar.Toggle)

export default class Navigation extends React.Component {
  constructor(options) {
    super(options)

    this.headerLabel = 'Navigation'
    this.headerLink = '#/'
    this.inverse = false
    this.state = {
      expanded: false,
    }
  }

  getMenuItems() {
    return []
  }

  getActiveTopPath() {
    parts = this.props.location.pathname.split('/')
    firstTwo = take(2, drop(1, parts))
    return "/" + firstTwo.join('/')
  }

  handleToggle() {
    return this.setState({
      expanded: !this.state.expanded
    })
  }

  handleShrink() {
    return this.setState({
      expanded: false
    })
  }

  renderNavItems() {
    /*
    const activeTopPath = this.getActiveTopPath()
    const = (activeLinksMapper) => {
      return item
    }
    const =
    (navItemMapper) => {
      return navItem({
        key: item.label,
        eventKey: item.label,
        href: "#" + item.href,
        active: item.active,
        onClick: bind$(this$, 'handleShrink')
      }, item.label)
    }
    menuItems = this.getMenuItems()
    for (i$ = 0, len$ = (ref$ = (fn$())).length; i$ < len$; ++i$) {
      i = ref$[i$]
      item = menuItems[i]
      if (new RegExp("^" + activeTopPath + "$").test(item.href)) {
        item.active = true
      }
    }
    return map(navItemMapper, menuItems)
    function fn$() {
      var i$, results$ = []
      for (i$ = menuItems.length - 1; i$ >= 0; --i$) {
        results$.push(i$)
      }
      return results$
    }
    */
  }

  render() {
    return navbar({
      onToggle: this.handleToggle.bind(this),
      expanded: this.state.expanded,
      inverse: this.inverse,
      style: {
        marginBottom: 50,
      },
    }, navbarHeader(undefined, navbarBrand(undefined, a({
      href: this.headerLink,
    }, this.headerLabel)), navbarToggle()), navbarCollapse(undefined, nav(undefined, this.renderNavItems()), accountDropdown({
      logout: this.props.logout,
      onClick: this.handleShrink.bind(this),
      profile: this.props.profile,
      session: this.props.session,
    })))
  }
}
