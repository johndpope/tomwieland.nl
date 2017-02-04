// import log from 'loglevel'
import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
  constructor(options) {
    super(options)

    this.headerLabel = 'Navigation'
    this.headerLink = '#/'

    this.style = 'inverse'
    this.bgStyle = 'primary'

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
    const firstTwo = [splitPath[0], splitPath[1]].join('/')
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
    // const activeTopPath = this.getActiveTopPath()
    const menuItems = this.getMenuItems()

    return menuItems.map((item, i) => {
      const {
        href,
        label,
      } = item

      return (
        <Link key={i} to={href} activeOnlyWhenExact>
          {params => <a className={`nav-item nav-link ${params.isActive ? 'active' : ''}`} href={href} onClick={params.onClick}>{label}</a>}
        </Link>
      )
    })
  }

  render() {
    const style = `navbar-${this.style}`
    const bgStyle = `bg-${this.bgStyle}`

    return (
      <nav className={`navbar navbar-toggleable-sm ${style} ${bgStyle}`}>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="#/">TomWieland.nl</a>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mr-auto">
            {this.renderNavItems()}
          </ul>
        </div>
      </nav>
    )
  }
}
