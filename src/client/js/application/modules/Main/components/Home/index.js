import Halogen from 'halogen'
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import ArticlesQuery from './queries/Articles'

import Article from './components/Article'

@connect(
  (state) => {
    return {
      session: state.Application.Session.session,
    }
  },

  (dispatch) => {
    return {
      // handleList(token, skip = 0, limit = 10, order = 'created DESC') {
      //   dispatch(list(token, skip, limit, order))
      // },

      navigateToShow(id) {
        console.log('TODO: Implement.')
        // dispatch(push(`/blog/${id}`))
      },
    }
  }
)
@graphql(ArticlesQuery, {
  props: ({ data, ownProps, mutate }) => {
    return {
      Articles: data.Articles,
    }
  },
})
export default class Home extends React.Component {
  componentWillMount() {
    const { token } = this.props.session

    // this.props.handleList(token)
  }

  renderArticles() {
    const entries = _(this.props.Articles)
      .sortBy('created')
      .value()
      .reverse()

    return entries.map((v, i) => <Article key={i} post={v} />)
  }

  render() {
    const articles = this.props.Articles

    if (!articles || !articles.length) {
      return <center><Halogen.ClipLoader color="#000000" /></center>
    }

    return (
      <div className="container-fluid page-home">
        {this.renderArticles()}
        <div className="row">
          <div
            className="col-xs"
            style={{
              textAlign: 'center',
            }}
          >
            <a href="#/blog">Archive</a>
          </div>
        </div>
      </div>
    )
  }
}
