// import log from 'loglevel'
import React from 'react'
import _ from 'lodash'
import {
  Link,
  Route,
} from 'react-router-dom'

export default class Navigation extends React.Component {
  constructor(options) {
    super(options)

    this.headerLabel = 'Navigation'
    this.headerLink = '/'

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
    const path = window.location.path
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
        <Route path={href} key={i} children={({ match, onClick }) => (
          <Link className={`nav-item nav-link ${match ? 'active' : ''}`} to={href} onClick={onClick}>
            {label}
          </Link>
        )} />
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
        <Link className="navbar-brand" to="/">TomWieland.nl</Link>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mr-auto">
            {this.renderNavItems()}
          </ul>
        </div>
      </nav>
    )
  }
}
