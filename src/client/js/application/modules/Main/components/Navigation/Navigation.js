import React from 'react'

import Navigation from '../../../../../library/components/Navigation'

export default class MainNavigation extends Navigation {
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
      }, {
        href: '/about',
        label: 'About',
      }, {
        href: '/contact',
        label: 'Contact',
      },
    ]
  }
}
