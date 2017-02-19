import CSSModules from 'react-css-modules'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import Article from '../Article'
import List from '../List/List'
import styles from './styles.module.scss'

export default connect(
  (state) => {
    return {
      session: state.Application.Session.session,
    }
  },

  (dispatch) => {
    return {
    }
  }
)
(graphql(gql`
  query ArticlesByUser($username: String!, $offset: Int!, $limit: Int!) {
    articlesByUser(username: $username, offset: $offset, limit: $limit) {
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
`, {
  options: (props) => {
    return {
      variables: {
        username: props.match.params.username,
        offset: 0,
        limit: 10,
      }
    }
  },
  props: ({ data, ownProps, mutate }) => {
    return {
      articles: data.articlesByUser,
    }
  },
})
(CSSModules(styles)(List)))
