import gql from 'graphql-tag'

export default gql`
  query articleBySlug($slug: String!) {
    ArticleBySlug(slug: $slug) {
      id,
      title,
      slug,
      body,
      created,
      updated,

      user {
        id,
        username
      },

      tags {
        id,
        label,
      },

      comments {
        id,
        body,
        created,
        updated,

        user {
          id,
          username
        }
      }
    }
  }
`
