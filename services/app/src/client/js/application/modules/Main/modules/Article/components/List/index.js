import React from 'react'
import _ from 'lodash'
import log from 'loglevel'
import moment from 'moment'
import { connect } from 'react-redux'

@connect(
  (state) => {
    return {
      session: state.Application.Session.session,
      list: state.Application.Main.Article.list,
    }
  },

  (dispatch) => {
    return {
    }
  }
)
export default class List extends React.Component {
  componentWillMount() {
    // const { token } = this.props.session.token

    // return this.props.handleList(token)
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
          <div className="col-xs-2" />
        )
      } else {
        cols.push(
          <div className="col-xs-2">
            <h1 style={{ marginTop: 0 }}>year</h1>
          </div>
        )
        previousYear = year
      }

      if (month === previousMonth) {
        cols.push(
          <div className="col-xs-2" />
        )
      } else {
        cols.push(
          <div className="col-xs-2">
            <h1 style={{ marginTop: 0 }}>month</h1>
          </div>
        )

        previousMonth = month
      }

      if (day === previousDay) {
        cols.push(
          <div className="col-xs-1" />
        )
      } else {
        cols.push(
          <div className="col-xs-1">
            <h1 style={{ marginTop: 0 }}>day</h1>
          </div>
        )

        previousDay = day
      }

      cols.push(
        <div
          className="col-xs-5"
          key={entry.id}
          style={{ height: 45 }}
        >
          <div style={{ position: 'absolute', bottom: 10 }}>
            <a href={`#/articles/${entry.slug}`}>{entry.title}</a>
          </div>
        </div>
      )

      rows.push(
        <div
          className="row"
          key={entry.id}
          style={{
            marginBottom: 50,
            borderBottom: '1px solid #eee',
          }}
        >
          {cols}
        </div>
      )
    })
  }

  render() {
    log.debug('List.render')

    return (
      <div>
        {this.renderPosts()}
      </div>
    )
  }
}
