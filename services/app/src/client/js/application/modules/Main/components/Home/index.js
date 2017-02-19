import CSSModules from 'react-css-modules'
import React from 'react'
import _ from 'lodash'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import Spinner from '../../../../../library/components/Spinner'

import styles from './styles.module.scss'
import Article from '../../modules/Article/components/Article'
import Tags from '../../modules/Article/components/Tags'

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
  query Articles($offset: Int!, $limit: Int!) {
    articles(offset: $offset, limit: $limit) {
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
  options: (props) => {
    return {
      variables: {
        offset: 0,
        limit: 5,
      }
    }
  },
  props: ({ data, ownProps, mutate }) => {
    return {
      articles: data.articles,
    }
  },
})
@graphql(gql`
  query Tags {
    tags {
      id
      label
    }
  }
`, {
  props: ({ data, ownProps, mutate }) => {
    return {
      tags: data.tags,
    }
  },
})
@CSSModules(styles)
export default class Home extends React.Component {
  renderArticles() {
    const {
      articles
    } = this.props

    if (!articles) {
      return <Spinner />
    }

    const articleElements = this.props.articles.map((v, i) => {
      return <Article key={i} article={v} />
    })

    articleElements.push(
      <div className="row" key={articleElements.length}>
        <div
          className="col"
          style={{
            textAlign: 'center',
          }}
        >
          <Link to="/articles">Archive</Link>
        </div>
      </div>
    )

    return articleElements
  }

  renderTagsBlock() {
    const { tags } = this.props

    if (!tags) {
      return <Spinner />
    }

    return (
      <div className="row">
        <div className="col">
          <h4>Tags</h4>
          <Tags tags={tags} />
        </div>
      </div>
    )
  }

  render() {
    const {
      styles,
    } = this.props

    return (
      <div className={`container-fluid ${styles.page}`}>
        <div className="row">
          <div className="col">
            {this.renderArticles()}
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
            {this.renderTagsBlock()}

          </div>
        </div>
      </div>
    )
  }
}
