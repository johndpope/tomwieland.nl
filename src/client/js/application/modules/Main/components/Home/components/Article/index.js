import CSSModules from 'react-css-modules'
import React from 'react'
import log from 'loglevel'
import moment from 'moment'

import styles from './styles.module.scss'

@CSSModules(styles)
export default class Article extends React.Component {
  renderDate() {
    const {
      post: {
        createdAt,
      },
    } = this.props

    const day = moment(createdAt).format('Do')
    const month = moment(createdAt).format('MMM')
    const year = moment(createdAt).format('YYYY')

    return `${day} ${month} ${year}`
  }

  renderTitle() {
    const {
      post: {
        title,
        slug,
      },
      styles,
    } = this.props

    return (
      <h4 className={`card-title ${styles.title}`}>
        <a href={`#/blog/${slug}`}>
          {title}
        </a>
      </h4>
    )
  }

  renderUsername() {
    const {
      post: {
        user: {
          username,
        },
      },
    } = this.props

    return <a href={`#/blog/by/${username}`}>{username}</a>
  }

  renderBody() {
    const {
      post: {
        body,
      },
    } = this.props

    return body
  }

  renderFooter() {
    const {
      post: {
        slug,
        comments,
      },
    } = this.props

    return (
      <div className="card-footer">
        <span>
          <a href={`#/blog/${slug}`}>Read more</a>
        </span>
        <span
          style={{
            float: 'right',
          }}
        >
          {comments.length} comments
        </span>
      </div>
    )
  }

  renderDefaultState() {
    return (
      <div className="row">
        <div className="col-xs">
          <div className="card">
            <div className="card-block">
              {this.renderTitle()}
              <p className="card-text">
                {this.renderDate()} by {this.renderUsername()}<br />
                <br />
                {this.renderBody()}
              </p>
            </div>
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
