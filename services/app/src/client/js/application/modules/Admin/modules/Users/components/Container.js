import React from 'react'
import log from 'loglevel'
import reactBootstrap from 'react-bootstrap'

import createElement from '../../../../../../library/create-element'

const div = createElement('div')

export default class Container extends React.Component {
  render() {
    log.debug('modules/admin/modules/users/components/Container#render')
    return div({
      style: {
        marginTop: '21px'
      }
    }, this.props.children)
  }
}
