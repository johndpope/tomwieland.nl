import gql from 'graphql-tag'

export default gql`
  query {
    BlogPosts {
      id
    }
  }
`

/*
      user {
        username
      }
      title
      slug
      body
      createdAt
      updatedAt
      blogComments {
        body
      }
*/
