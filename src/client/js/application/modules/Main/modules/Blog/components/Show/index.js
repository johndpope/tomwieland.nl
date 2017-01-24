import React from 'react'
import log from 'loglevel'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import showAction from '../../actions/show'

import ArticleBySlug from './queries/ArticleBySlug'

@connect(
  (state) => {
    return {
      session: state.Application.Session.session,
      show: state.Application.Main.Blog.show,
    }
  },

  (dispatch) => {
    return {
      handleShow: (token, slug) => dispatch(showAction(token, slug)),
      handleRedirectToPrevious: () => window.history.back(),
      handleRedirectToList: () => {
        console.log('TODO: Fix redirect')
        // dispatch(push('/blog')
      },
    }
  },
)
@graphql(ArticleBySlug, {
  options: (props) => {
    return {
      variables: {
        slug: props.params.slug,
      },
    }
  },

  props: ({ data, ownProps, mutate }) => {
    return {
      Article: data.Article,
    }
  },
})
export default class Show extends React.Component {
  componentWillMount() {
    const slug = this.props.params.slug
    // const token = this.props.session.token

    // this.props.handleShow(token, slug)
  }

  renderLoadingState() {
    // TODO: Add spinner?
    return (
      <div />
    )
  }

  renderLoadedState() {
    const entry = this.props.Article

    return (
      <div className="container-fluid page-blog-show">
        <div className="row">
          <div className="col-xs">
            <pre>
              {JSON.stringify(entry)}
            </pre>
          </div>
        </div>
      </div>
    )
  }

  render() {
    log.debug('Show.render')

    if (this.props.show.isFetching) {
      return this.renderLoadingState()
    } else if (this.props.show.hasSucceeded) {
      return this.renderLoadedState()
    } else if (this.props.show.hasFailed) {
      return this.props.handleRedirectToList()
    }

    return this.renderLoadingState()
  }
}
