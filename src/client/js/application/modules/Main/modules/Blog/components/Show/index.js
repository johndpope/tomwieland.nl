import { connect } from 'react-redux'

import Component from './Show'

import showAction from '../../actions/show'

export default connect(
  (state) => {
    return {
      session: state.Application.Session.session,
      show: state.Application.Main.Blog.show,
    }
  },

  (dispatch) => {
    return {
      handleShow: (token, slug) => dispatch(showAction(token, slug)),
      handleRedirectToPrevious: () => window.history.back(),
      handleRedirectToList: () => dispatch(push('/blog')),
    }
  }
)(Component)
