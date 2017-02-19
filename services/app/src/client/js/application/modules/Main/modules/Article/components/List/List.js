import Halogen from 'halogen'
import React from 'react'

import Spinner from '../../../../../../../library/components/Spinner'

import Article from '../Article'

export default class List extends React.Component {
  renderArticles() {
    return this.props.articles.map((v, i) => {
      return <Article key={i} article={v} />
    })
  }

  renderLoadingState() {
    return <Spinner/>
  }

  renderLoadedState() {
    const {
      styles,
    } = this.props

    return (
      <div className={`container-fluid ${styles.page}`}>
        <div className="row">
          <div className="col">
            {this.renderArticles()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { articles } = this.props

    if (!articles || !articles.length) {
      return this.renderLoadingState()
    }

    return this.renderLoadedState()
  }
}
