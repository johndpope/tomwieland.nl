import CSSModules from 'react-css-modules'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import styles from './styles.module.scss'
import List from '../common/List'

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
  query Articles($offset: Int!, $limit: Int!) {
    articles(offset: $offset, limit: $limit) {
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
        offset: 0,
        limit: 10,
      }
    }
  },
  props: ({ data, ownProps, mutate }) => {
    return {
      articles: data.articles,
    }
  },
})
(CSSModules(styles)(List)))
