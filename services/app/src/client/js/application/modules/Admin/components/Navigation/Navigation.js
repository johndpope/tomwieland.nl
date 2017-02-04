import React from 'react'
import Navigation from '../../../../../library/components/Navigation'

export default class AdminNavigation extends Navigation {
  constructor(options) {
    super(options)

    this.headerLink = '/admin'
    this.headerLabel = 'Admin'
    this.inverse = true
  }

  getMenuItems() {
    return [
      {
        href: '/admin',
        label: 'Dashboard',
      }, {
        href: '/admin/users',
        label: 'Users',
      }, {
        href: '/admin/access',
        label: 'Access',
      },
    ]
  }
}
