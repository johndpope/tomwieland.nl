import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(gql`
  query AllBlogPosts {
    blogposts {
      id
      user {
        id
      }
      title
      slug
      body
      createdAt
      updatedAt
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
    }
  },
})
