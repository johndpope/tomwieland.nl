import CSSModules from 'react-css-modules'
import Halogen from 'halogen'
import React from 'react'
import _ from 'lodash'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
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
      },
    }
  }
)
@graphql(gql`
  query {
    articles {
      id,
      title,
      slug,
      body,
      created,
      updated,
      user {
        id,
        username
      },
      tags {
        id,
        label,
      },
      comments {
        id,
        body,
        created,
        updated,
        user {
          id,
          username
        }
      }
    }
  }
`, {
  props: ({ data, ownProps, mutate }) => {
    return {
      articles: data.articles,
    }
  },
})
@CSSModules(styles)
export default class Home extends React.Component {
  renderArticles() {
    return this.props.articles.map((v, i) => {
      return <Article key={i} article={v} />
    })
  }

  renderLoadingState() {
    return <center><Halogen.ClipLoader color="#000000" /></center>
  }

  renderDefaultState() {
    const {
      styles,
    } = this.props

    return (
      <div className={`container-fluid ${styles.page}`}>
        <div className="row">
          <div className="col">
            {this.renderArticles()}
            <div className="row">
              <div
                className="col"
                style={{
                  textAlign: 'center',
                }}
              >
                <Link to="/articles">Archive</Link>
              </div>
            </div>
          </div>
          <div className="hidden-sm-down col-md-3">
            <div className="row">
              <div className="col">
                <h4>About</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                  volutpat euismod purus, at facilisis eros tempor vitae. Quisque
                  ante mi, ultricies sit amet scelerisque at, lacinia vel dui. Ut
                  placerat scelerisque scelerisque. Morbi dignissim eget ligula eu
                  maximus. Vestibulum volutpat volutpat massa a tincidunt.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4>Archives</h4>
                <ul>
                  <li>WHat</li>
                  <li>WHat</li>
                  <li>WHat</li>
                  <li>WHat</li>
                  <li>WHat</li>
                  <li>WHat</li>
                </ul>
              </div>
            </div>
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

    return this.renderDefaultState()
  }
}
