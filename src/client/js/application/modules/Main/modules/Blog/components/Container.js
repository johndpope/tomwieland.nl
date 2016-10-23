import React from 'react'

import createElement from '../../../../../../library/create-element'

const div = createElement('div')

export default class Container extends React.Component {
  render() {
    return div({
      style: {
        marginTop: '21px',
      },
    }, this.props.children)
  }
}
