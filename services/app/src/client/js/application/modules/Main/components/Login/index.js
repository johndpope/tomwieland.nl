// import log from 'loglevel'
import CSSModules from 'react-css-modules'
import React from 'react'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import styles from './styles.module.scss'

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
@graphql(gql`
  mutation SessionWithEmail($email: String!, $password: String!) {
    sessionWithEmail(email: $email, password: $password) {
      id
      ttl
      created
      user {
        id
        email
        username
      }
    }
  }
`, {
  options: () => {
    return {
      variables: {
        email: '',
        password: '',
      },
    }
  },

  props: ({ data, ownProps, mutate }) => {
    return {
      handleFormSubmit: (options) => {
        ownProps.LoginAction(mutate, options)
      },
    }
  },
})
@CSSModules(styles)
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
      styles,
    } = this.props

    return (
      <div className={`container-fluid ${styles.page}`}>
        <div className="row">
          <div className="col">
            <form
              className={`${styles.formContainer}`}
              onSubmit={this.handleFormSubmit.bind(this)}
            >
              <h4>Login</h4>
              <div className="form-group">
                <label htmlFor="loginEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  placeholder="Enter email"
                  ref={(node) => { this.emailElement = node }}
                  disabled={isLoggingIn}
                  autoFocus
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
    )
  }
}
