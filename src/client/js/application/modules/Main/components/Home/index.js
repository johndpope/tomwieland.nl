import Halogen from 'halogen'
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import BlogPostsQuery from './queries/BlogPosts'

import BlogPost from './components/BlogPost'

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
@graphql(BlogPostsQuery, {
  props: ({ data, ownProps, mutate }) => {
    return {
      BlogPosts: data.BlogPosts,
    }
  },
})
export default class Home extends React.Component {
  componentWillMount() {
    const { token } = this.props.session

    // this.props.handleList(token)
  }

  renderBlogPosts() {
    const entries = _(this.props.BlogPosts)
      .sortBy('createdAt')
      .value()
      .reverse()

    return entries.map((v, i) => <BlogPost key={i} post={v} />)
  }

  render() {
    const blogPosts = this.props.BlogPosts

    if (!blogPosts || !blogPosts.length) {
      return <center><Halogen.ClipLoader color="#000000" /></center>
    }

    return (
      <div className="container-fluid page-home">
        {this.renderBlogPosts()}
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
