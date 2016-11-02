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
  state => {
    return {
      session: state.Application.Session.session,
    }
  },

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
    const blogposts = this.props.blogposts || []

    return blogposts.map(v =>
      <BlogPost
        key={v.id}
        eventKey={v.id}
        id={v.id}
        userId={v.userId}
        tvle={v.tvle}
        slug={v.slug}
        body={v.body}
        createdAt={v.createdAt}
        updatedAt={v.updatedAt}
      />
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

