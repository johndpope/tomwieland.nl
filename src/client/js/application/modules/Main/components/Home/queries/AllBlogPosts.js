import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(gql`
  query AllBlogPosts {
    blogposts {
      id
      user {
        id
        email
        emailVerified
        username
        realm
      }
      title
      slug
      body
      createdAt
      updatedAt
      blogComments {
        id
        email
        body
      }
    }
  }
`, {
  options: (options) => {
    return {
      variables: {
      },
    }
  },
  props: ({ data, ownProps, mutate }) => {
    return {
      blogposts: data.blogposts
    }
  },
})
