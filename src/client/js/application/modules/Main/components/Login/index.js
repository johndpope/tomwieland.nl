import React from 'react'
import log from 'loglevel'
import reactDOM from 'react-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'

import UserLoginWithEmailMutation from './mutations/UserLoginWithEmail'

import LoginAction from '../../../Session/actionCreators/Login'

@connect(
  (state) => {
    return {
      session: state.Application.Session.session,
      profile: state.Application.Session.profile,
    }
  },

  (dispatch) => {
    return {
      LoginAction: (...x) => dispatch(LoginAction(dispatch, ...x)),
    }
  }
)
@graphql(UserLoginWithEmailMutation, {
  props: ({ data, ownProps, mutate }) => {
    return {
      handleFormSubmit: (options) => {
        ownProps.LoginAction(mutate, options)
      },
    }
  },
})
export default class Login extends React.Component {
  handleFormSubmit(event) {
    event.preventDefault()

    const email = this.emailElement.value
    const password = this.passwordElement.value

    this.props.handleFormSubmit({ email, password })
  }

  // TODO: Stop using the ref="". Check the docs on this.
  render() {
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
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      placeholder="Enter email"
                      ref={(node) => { this.emailElement = node }}
                      disabled={isLoggingIn}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      placeholder="Password"
                      aria-describedby="passwordHelp"
                      ref={(node) => { this.passwordElement = node }}
                      disabled={isLoggingIn}
                    />
                    <small className="form-text text-muted" id="passwordHelp">
                      Apply face to keyboard in rolling fashion
                    </small>
                  </div>

                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isLoggingIn}
                  >
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
}
