import React from 'react'
import log from 'loglevel'
import moment from 'moment'

import {
  Grid,
  Col,
  Panel,
  Row,
} from 'react-bootstrap'

export default class BlogPost extends React.Component {
  render() {
    const month = moment(this.props.createdAt).format('MMM')
    const day = moment(this.props.createdAt).format('Do')
    const year = moment(this.props.createdAt).format('YYYY')

    console.log('hmm', this.props)

    return (
      <Row style={{ marginTop: 15, marginBottom: 10 }}>
        <Col xs={4}>
          <div style={{ float: 'right' }}>
            <h1 style={{ float: 'left', marginTop: 1, marginLeft: 0, marginRight: 0, marginBottom: 0 }}>{day}</h1>
            <div style={{ float: 'right' }}>
              <h4 style={{ margin: 0 }}>{month}</h4>
              <h4 style={{ margin: 0 }}>{year}</h4>
            </div>
          </div>
        </Col>
        <Col xs={8}>
          <div style={{ marginTop: 8, height: 50 }}>
            <div style={{ position: 'absolute', height: 45 }}>
              <h2 style={{ margin: 0 }}>
                <a href={`#/blog/${this.props.slug}`} style={{ color: '#000000', textDecoration: 'none' }}>
                  {this.props.title}
                </a>
              </h2>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}
