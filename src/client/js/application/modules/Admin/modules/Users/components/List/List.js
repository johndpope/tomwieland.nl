import React from 'react'
import log from 'loglevel'
import map from 'prelude-ls'

import {
  Button,
  ButtonToolbar,
  Col,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  Grid,
  Row,
  Table,
} from 'react-bootstrap'

import createElement from '../../../../../../../library/create-element'

export default class List extends React.Component {
  componentWillMount() {
    return this.props.handleList(this.props.session.token)
  }

  handleRowClick(email, event) {
    event.preventDefault()

    return this.props.navigateToShow(email)
  }

  renderRows() {
    return map(({ username, email }) => {
      return (
        <tr>
          <td>{username}</td>
          <td>{email}</td>
          <td>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={() => this.props.navigateToShow(email)}>
                <Glyphicon glyph="eye-open" />
              </Button>
              <Button bsStyle="success" onClick={() => this.props.navigateToEdit(email)}>
                <Glyphicon glyph="pencil" />
              </Button>
              <Button bsStyle="danger" onClick={() => this.props.showDeleteModal(email)}>
                <Glyphicon glyph="trash" />
              </Button>
            </ButtonToolbar>
          </td>
        </tr>
      )
    })
  }

  renderPagination() {
    return false
  }

  renderTable() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          {this.renderPagination()}
        </Row>
      </div>
    )
  }

  renderLoading() {
    return <Loader loaded={false} color="#000000" />
  }

  render() {
    if (this.props.users.length === 0) {
      return this.renderLoading()
    }

    return (
      <Grid>
        {this.renderTable()}
      </Grid>
    )
  }
}
