import Halogen from 'halogen'
import React from 'react'
import log from 'loglevel'
import reactDOM from 'react-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import UserLoginWithEmailMutation from './mutations/UserLoginWithEmail'

import SetCookieAction from '../../../Session/actions/SetCookie'

@connect(
  state => ({
    session: state.Application.Session.session,
    profile: state.Application.Session.profile,
  }),

  dispatch => ({
    SetCookieAction,
  })
)
@graphql(UserLoginWithEmailMutation, {
  props: ({ data, ownProps, mutate }) => {
    return {
      handleFormSubmit: async (options) => {
        const data = await mutate({ variables: options })

        // TODO: Set the data
      },
    }
  },
})
export default class Login extends React.Component {
  // TODO: Don't use findDOMNode. Check ESLint.
  // TODO: Don't use this.refs. Check ESLint.
  handleFormSubmit(event) {
    event.preventDefault()

    const email = this.emailElement.value
    const password = this.passwordElement.value

    this.props.handleFormSubmit({ email, password })
  }

  renderLogginInState() {
    return <center><Halogen.ClipLoader color="#000000" /></center>
  }

  renderDefaultState() {
    const {
      session: {
        isLoggingIn,
      },
    } = this.props

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs col-sm col-md col-lg col-xl" />
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-block">
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                  <h4 className="card-title">Login</h4>
                  <div className="form-group">
                    <label htmlFor="loginEmail">Email address</label>
                    <input type="email" className="form-control" id="loginEmail" placeholder="Enter email" ref={(node) => { this.emailElement = node }} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input type="password" className="form-control" id="loginPassword" placeholder="Password" aria-describedby="passwordHelp" ref={(node) => { this.passwordElement = node }} />
                    <small className="form-text text-muted" id="passwordHelp">
                      Apply face to keyboard in rolling fashion
                    </small>
                  </div>

                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-xs" />
        </div>
      </div>
    )
  }

  // TODO: Stop using the ref="". Check the docs on this.
  render() {
    const {
      session: {
        isLoggingIn,
      },
    } = this.props

    if (isLoggingIn) {
      return this.renderLoggingInState()
    }

    return this.renderDefaultState()
  }
}
