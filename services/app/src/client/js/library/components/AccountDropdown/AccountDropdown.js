import Loader from 'react-loader'
import React from 'react'

import {
  Nav,
  NavItem,
  MenuItem,
  NavDropdown,
} from 'react-bootstrap'

const handleClickLogout = (props, event) => {
  event.preventDefault()

  props.logout(props.session.token, (error) => {
    if (error) {
      return
    }

    if (props.onClick) {
      props.onClick(event)
    }
  })
}

const renderLoggedOut = props =>
  <Nav pullRight>
    <NavItem eventKey="4" href="/login" onClick={props.onClick}>
      Log in
    </NavItem>
  </Nav>

const renderLoggedIn = props =>
  <Nav pullRight>
    <NavDropdown eventKey="4" id="basic-nav-dropdown" title={props.profile.username}>
      <MenuItem eventKey="4.0" href="/">Public</MenuItem>
      <MenuItem eventKey="4.1" href="/admin">Admin</MenuItem>
      <MenuItem eventKey="4.2" onClick={handleClickLogout(props)}>Admin</MenuItem>
    </NavDropdown>
  </Nav>

const renderLoading = () =>
  <Nav pullRight>
    <NavItem eventKey="4" style={{ marginTop: '10px' }}>
      <Loader loaded={false} scale={0.5} color="#ffffff"/>
    </NavItem>
  </Nav>

export default class AccountDropdown extends React.Component {
  render() {
    const { session } = this.props

    if (!session) {
      return renderLoggedOut(this.props)
    }

    if (session.isLoggingIn || session.isLoggingOut) {
      return renderLoading(this.props)
    }

    if (session.token) {
      return renderLoggedIn(this.props)
    }

    return renderLoggedOut(this.props)
  }
}
