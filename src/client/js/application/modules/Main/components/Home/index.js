import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'

import AllBlogPostsQuery from './queries/AllBlogPosts'

import BlogPost from './BlogPost'

@connect(
  state => ({
    session: state.Application.Session.session,

    // TODO: Fix this.
    // blogposts: state.Application.Main.Blog.list,
    blogposts: {},
  }),
  dispatch => ({
    // handleList(token, skip = 0, limit = 10, order = 'created DESC') {
    //   dispatch(list(token, skip, limit, order))
    // },

    navigateToShow(id) {
      console.log('TODO: Implement.')
      //dispatch(push(`/blog/${id}`))
    },
  })
)
@AllBlogPostsQuery
export default class Home extends React.Component {
  componentWillMount() {
    const { token } = this.props.session

    // this.props.handleList(token)
  }

  renderBlogPosts() {
    const { entries } = this.props.blogposts

    return _.map(it =>
      <BlogPost
        key={it.id}
        eventKey={it.id}
        id={it.id}
        userId={it.userId}
        title={it.title}
        slug={it.slug}
        body={it.body}
        createdAt={it.createdAt}
        updatedAt={it.updatedAt}
      >
        {entries}
      </BlogPost>
    )
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            {this.renderBlogPosts()}
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{ textAlign: 'center' }}>
            <a href="#/blog">Archive OMG</a>
          </Col>
        </Row>
      </Grid>
    )
  }
}

