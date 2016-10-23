import React from 'react'
import _ from 'lodash'
import moment from 'moment'

import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap'

export default class List extends React.Component {
  componentWillMount() {
    const { token } = this.props.session.token

    return this.props.handleList(token)
  }

  renderPosts() {
    let { entries } = this.props.list

    entries = _.reverse(_.sortBy(entries.asMutable(), it => it.createdAt))

    const rows = []

    let previousDay
    let previousMonth
    let previousYear

    _.each(entries, (entry, i) => {
      const day = moment(entry.createdAt).format('DD')
      const month = moment(entry.createdAt).format('MM')
      const year = moment(entry.createdAt).format('YYYY')
      const cols = []

      if (year === previousYear) {
        cols.push(
          <Col xs={2} />
        )
      } else {
        cols.push(
          <Col xs={2}>
            <h1 style={{ marginTop: 0 }}>year</h1>
          </Col>
        )
        previousYear = year
      }

      if (month === previousMonth) {
        cols.push(
          <Col xs={2} />
        )
      } else {
        cols.push(
          <Col xs={2}>
            <h1 style={{ marginTop: 0 }}>month</h1>
          </Col>
        )

        previousMonth = month
      }

      if (day === previousDay) {
        cols.push(
          <Col xs={1} />
        )
      } else {
        cols.push(
          <Col xs={1}>
            <h2 style={{ marginTop: 0 }}>day</h2>
          </Col>
        )

        previousDay = day
      }

      cols.push(
        <Col
          key={entry.id}
          xs={5}
          style={{ height: 45 }}
        >
          <div style={{ position: 'absolute', bottom: 10 }}>
            <a href={`#/blog/${entry.slug}`}>{entry.title}</a>
          </div>
        </Col>
      )

      rows.push(
        <Row
          key={entry.id}
          style={{
            marginBottom: 50,
            borderBottom: '1px solid #eee',
          }}
        >
          {cols}
        </Row>
      )
    })
  }

  render() {
    const { entries, entriesByYear } = this.props.list

    return (
      <Grid>
        {this.renderPosts()}
      </Grid>
    )
  }
}
