import { connect } from 'react-redux'
import listAction from '../../actions/list'

import Component from './List'

export default connect(
  (state) => {
    return {
      session: state.Application.Session.session,
      list: state.Application.Main.Blog.list,
    }
  },

  (dispatch) => {
    return {
      handleList: token => dispatch(listAction(token)),
    }
  }
)(Component)
