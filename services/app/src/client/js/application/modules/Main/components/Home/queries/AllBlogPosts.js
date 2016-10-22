import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(gql`
  query AllBlogPosts {
    blogposts {
      id
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
