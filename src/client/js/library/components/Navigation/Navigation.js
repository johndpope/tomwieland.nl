import React from 'react'
import _ from 'lodash'
import log from 'loglevel'
import { Link } from 'react-router'

class NavigationLink extends React.Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default class Navigation extends React.Component {
  constructor(options) {
    super(options)

    this.headerLabel = 'Navigation'
    this.headerLink = '#/'

    this.style = 'light'

    this.state = {
      expanded: false,
    }
  }

  getMenuItems() {
    return []
  }

  getActiveTopPath() {
    const hash = window.location.hash
    const path = hash.replace('#', '')
    const splitPath = path.split('/')
    const firstTwo = [ splitPath[0], splitPath[1] ].join('/')
    return firstTwo
  }

  handleToggle() {
    return this.setState({
      expanded: !this.state.expanded,
    })
  }

  handleShrink() {
    return this.setState({
      expanded: false,
    })
  }

  renderNavItems() {
    const activeTopPath = this.getActiveTopPath()
    const menuItems = this.getMenuItems()

    return menuItems.map((item, i) => {
      const {
        href,
        label,
      } = item

      return (
        <Link key={i} to={href} activeOnlyWhenExact>
          {params =>
            <li className={`nav-item ${params.isActive ? 'active' : ''}`}>
              <a className="nav-link" href={href} onClick={params.onClick}>{label}</a>
            </li>
          }
        </Link>
      )
    })
  }

  render() {
    return (
      <nav className={`navbar navbar-${this.style}`}>
        <a className="navbar-brand" href={this.headerLink}>{this.headerLabel}</a>
        <ul className="nav navbar-nav">
          {this.renderNavItems()}
        </ul>
      </nav>
    )
  }
}
