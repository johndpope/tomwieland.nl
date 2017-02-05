import CSSModules from 'react-css-modules'
import React from 'react'
import _ from 'lodash'
import gql from 'graphql-tag'
import log from 'loglevel'
import moment from 'moment'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

@connect(
  (state) => {
    return {
      session: state.Application.Session.session,
      show: state.Application.Main.Article.show,
    }
  },

  (dispatch) => {
    return {
      // handleRedirectToPrevious: () => window.history.back(),
      handleRedirectToList: () => {
        console.log('TODO: Fix redirect')
        // dispatch(push('/articles')
      },
    }
  },
)
@graphql(gql`
  query articleBySlug($slug: String!) {
    articleBySlug(slug: $slug) {
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
        slug: props.match.params.slug,
      },
    }
  },

  props: ({ data, ownProps, mutate }) => {
    return {
      loading: data.loading,
      article: data.articleBySlug,
    }
  },
})
@CSSModules(styles)
export default class Show extends React.Component {
  renderLoadingState() {
    // TODO: Add spinner?
    return (
      <div />
    )
  }

  renderDate(createdAt) {
    const day = moment(createdAt).format('Do')
    const month = moment(createdAt).format('MMM')
    const year = moment(createdAt).format('YYYY')

    return `${day} ${month} ${year}`
  }

  renderTitle() {
    const {
      article: {
        slug,
        title,
      },
      styles,
    } = this.props

    return (
      <h4 className={`card-title ${styles.articleTitle}`}>
        <Link to={`/articles/${slug}`}>
          {title}
        </Link>
      </h4>
    )
  }

  renderUsername(username) {
    return <Link to={`/articles/by/${username}`}>{username}</Link>
  }

  renderBody() {
    const {
      article: {
        body,
      },
    } = this.props

    return body
  }

  renderTags() {
    const {
      article: {
        tags,
      },
    } = this.props

    const links = []

    tags.forEach((v, i) => {
      if (i > 0) {
        links.push(', ')
      }

      links.push(
        <Link to={`/articles/tagged/${v.label}`}>{v.label}</Link>
      )
    })

    return (
      <span>{links}</span>
    )
  }

  renderComment(comment, i) {
    const {
      styles,
    } = this.props

    return (
      <div
        key={i}
        className="row"
      >
        <div className="col-xs">
          <div className={`card ${styles.commentCard}`}>
            <div className="card-block">
              <p className="card-text">
                {comment.body}
                <br />
                {this.renderDate(comment.createdAt)} by {this.renderUsername(comment.user.username)}.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderComments() {
    return this.props.article.comments.map((v, i) => this.renderComment(v, i))
  }

  renderLoadedState() {
    const {
      article,
    } = this.props

    return (
      <div className="container-fluid page-blog-show">
        <div className="row">
          <div className="col-xs">
            <div className="card">
              <div className="card-block">
                {this.renderTitle()}
                <p className="card-text">
                  {this.renderDate(article.createdAt)} by {this.renderUsername(article.user.username)}. Tags: {this.renderTags()}<br />
                  <br />
                  {this.renderBody()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {this.renderComments()}
      </div>
    )
  }

  render() {
    if (this.props.loading) {
      return this.renderLoadingState()
    }

    return this.renderLoadedState()
  }
}
