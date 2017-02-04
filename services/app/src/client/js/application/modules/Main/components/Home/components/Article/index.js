import CSSModules from 'react-css-modules'
import React from 'react'
import log from 'loglevel'
import moment from 'moment'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

@CSSModules(styles)
export default class Article extends React.Component {
  renderTags() {
    const {
      article: {
        tags,
      },
      styles,
    } = this.props

    const links = []

    tags.forEach((v, i) => {
      if (i > 0) {
        links.push(', ')
      }

      links.push(
        <span className="badge badge-default">
          <Link to={`/articles/tagged/${v.label}`}>{v.label}</Link>
        </span>
      )
    })

    return (
      <span className={`${styles.articleTags}`}>
        {links}
      </span>
    )
  }

  renderDate() {
    const {
      article: {
        createdAt,
      },
    } = this.props

    const day = moment(createdAt).format('Do')
    const month = moment(createdAt).format('MMM')
    const year = moment(createdAt).format('YYYY')

    return (
      <span className={`${styles.articleDate}`}>
        {day} {month} {year}`
      </span>
    )
  }

  renderTitle() {
    const {
      article: {
        title,
        slug,
      },
      styles,
    } = this.props

    return (
      <div className={`${styles.articleTitle}`}>
        <h4>
          <Link to={`/articles/${slug}`}>
            {title}
          </Link>
        </h4>
      </div>
    )
  }

  renderUsername() {
    const {
      article: {
        user: {
          username,
        },
      },
      styles,
    } = this.props

    return (
      <span className={`${styles.articleUsername}`}>
        <Link to={`/articles/by/${username}`}>{username}</Link>
      </span>
    )
  }

  renderHeader() {
    const {
      styles,
    } = this.props

    return (
      <div className={`${styles.articleHeader}`}>
        {this.renderTitle()}
        <div>
          <div className="float-sm-left">
            By {this.renderUsername()} on {this.renderDate()}<br/>
          </div>
          <div className="float-sm-right">
            {this.renderTags()}
          </div>
        </div>
      </div>
    )
  }

  renderBody() {
    const {
      article: {
        body,
      },
      styles,
    } = this.props

    return (
      <div className={`${styles.articleBody}`}>
        {body}
      </div>
    )
  }

  renderFooter() {
    const {
      article: {
        slug,
        comments,
      },
      styles,
    } = this.props

    let noun = ''
    if (comments.length === 1) {
      noun = 'comment'
    } else {
      noun = 'comments'
    }

    return (
      <div className={`${styles.articleFooter}`}>
        <Link className="btn btn-secondary" to={`/articles/${slug}`}>
          Read more
        </Link>
      </div>
    )
  }

  renderDefaultState() {
    const {
      styles,
    } = this.props

    return (
      <div className="row">
        <div className="col">
          <div className={`${styles.article}`}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.renderDefaultState()
  }
}
