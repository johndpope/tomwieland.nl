import CSSModules from 'react-css-modules'
import Halogen from 'halogen'
import React from 'react'
import { Link } from 'react-router-dom'

import Spinner from '../../../../../../../library/components/Spinner'

import styles from './styles.module.scss'

@CSSModules(styles)
export default class Tags extends React.Component {
  renderLoadingState() {
    return <Spinner />
  }

  renderLoadedState() {
    const {
      tags,
      styles,
    } = this.props

    const links = []

    tags.forEach((v, i) => {
      if (i > 0) {
        links.push(', ')
      }

      links.push(
        <span key={i} className="badge badge-default">
          <Link to={`/articles/tagged/${v.label}`}>{v.label}</Link>
        </span>
      )
    })

    return (
      <span className={`${styles.tags}`}>
        {links}
      </span>
    )
  }

  render() {
    const { tags } = this.props

    if (!tags) {
      return this.renderLoadingState()
    }

    return this.renderLoadedState()
  }
}
