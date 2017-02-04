import Halogen from 'halogen'
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
// import { graphql } from 'react-apollo'

// import ArticlesQuery from './queries/Articles'

// import Article from './components/Article'

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
    }
  },
)
// @graphql(ArticlesQuery, {
//   props: ({ data, ownProps, mutate }) => ({
//     Articles: data.Articles,
//   }),
// })
export default class Home extends React.Component {
  /*
  componentWillMount() {
    const { token } = this.props.session

    // this.props.handleList(token)
  }
  */

  /*
  renderArticles() {
    const entries = _(this.props.Articles)
      .sortBy('createdAt')
      .value()
      .reverse()

    return entries.map((v, i) => <Article key={i} post={v} />)
  }
  */

  render() {
    /*
    const articles = this.props.Articles

    if (!articles || !articles.length) {
      return <center><Halogen.ClipLoader color="#000000" /></center>
    }
    */

    return (
      <div className="container-fluid page-dashboard">
        <div className="row">
          <div className="col-xs">
            Dashboard!
          </div>
        </div>
      </div>
    )
  }
}
