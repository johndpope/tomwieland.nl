import React from 'react'
import { connect } from 'react-redux'

import Navigation from '../../../../../library/components/Navigation'

// import logoutAction from '../../../Session/actions/logout'

@connect(
  (state) => {
    return {
      session: state.Application.Session.session,
      profile: state.Application.Session.profile,
    }
  },

  (dispatch) => {
    return {
      // logout: () => dispatch(logoutAction()),
    }
  },
)
export default class AdminNavigation extends Navigation {
  constructor(options) {
    super(options)

    this.headerLink = '#/'
    this.headerLabel = 'TomWieland.nl'
  }

  getMenuItems() {
    return [
      {
        href: '/',
        label: 'Home',
      },
      {
        href: '/about',
        label: 'About',
      },
      {
        href: '/contact',
        label: 'Contact',
      },
      {
        href: '/login',
        label: 'Login',
      },
    ]
  }
}
