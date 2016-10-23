import React from 'react'
import log from 'loglevel'
import reactDom from 'react-dom'

import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  Panel,
  Row,
} from 'react-bootstrap'

export default class Login extends React.Component {
  // TODO: Don't use findDOMNode. Check ESLint for why.
  handleFormSubmit() {
    const email = reactDom.findDOMNode(this.refs.email).value
    const password = reactDom.findDOMNode(this.refs.password).value

    log.debug('modules/main/components/login/Login#handle-form-submit:email', email)
    log.debug('modules/main/components/login/Login#handle-form-submit:password', password)

    return this.props.handleLogin(email, password)
  }

  // TODO: Stop using the ref="". Check the docs on this.
  render() {
    const { isLoggingIn } = this.props.session

    return (
      <Grid style={{ marginTop: '21px' }}>
        <Row>
          <Col xs={12}>
            <Panel header="Login">
              <Form onSubmit={this.handleFormSubmit.bind(this)}>
                <FormGroup controlId="email">
                  <ControlLabel>Email</ControlLabel>
                  <FormControl ref="email" type="email" disabled={isLoggingIn} placeholder="Email" autoFocus />
                </FormGroup>
                <FormGroup controlId="password">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl ref="password" type="password" disabled={isLoggingIn} placeholder="Password" />
                </FormGroup>
                <Button ref="submit" type="submit" bsStyle="primary" disabled={isLoggingIn}>Login</Button>
              </Form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}
