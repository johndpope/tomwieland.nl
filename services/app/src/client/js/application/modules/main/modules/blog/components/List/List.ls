React           = require \react
create-element  = require \../../../../../../../library/create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap
moment          = require \moment

{
  map
  group-by
  sort-by
  each
  keys
  reverse
} = require \prelude-ls

a    = create-element \a
col  = create-element react-bootstrap.Col
div  = create-element \div
grid = create-element react-bootstrap.Grid
h1   = create-element \h1
h2   = create-element \h2
h3   = create-element \h3
h4   = create-element \h4
hr   = create-element \hr
row  = create-element react-bootstrap.Row

class List extends React.Component
  component-will-mount: ->
    { token } = @props.session

    log.debug \modules/main/modules/blog/components/List#component-will-mount, token

    @props.handle-list token

  render-posts: ->
    { entries } = @props.list

    entries = entries.as-mutable!
      |> sort-by (.created-at)
      |> reverse

    rows = []

    previous-day   = void
    previous-month = void
    previous-year  = void

    for entry in entries
      day   = moment entry.created-at .format 'DD'
      month = moment entry.created-at .format 'MM'
      year  = moment entry.created-at .format 'YYYY'

      cols = []

      if year is previous-year
        cols.push col xs: 2, ''
      else
        cols.push col xs: 2,
          h2 style: margin-top: 0, year
        previous-year = year

      if month isnt previous-month
        previous-month = month

        cols.push col xs: 2,
          h2 style: margin-top: 0, month
      else
        cols.push col xs: 2, ''

      if day isnt previous-day
        previous-day = day

        cols.push col xs: 1,
          h2 style: margin-top: 0, day
      else
        cols.push col xs: 1, ''

      cols.push col do
        key: entry.id
        xs: 5
        style:
          height: 45,

        div do
          style:
            position: \absolute
            bottom: 10

          a href: "#/blog/#{entry.slug}", entry.title

      rows.push row do
        key: entry.id
        style:
          margin-bottom: 50
          border-bottom: '1px solid #eee',
        cols

    rows

  render: ->
    log.debug \modules/main/modules/blog/components/List#render, @props

    {
      entries
      entries-by-year
    } = @props.list

    log.debug \modules/main/modules/blog/components/List#render:entries, entries

    log.debug \modules/main/modules/blog/components/List#render:entries-by-year, entries-by-year

    grid void, @render-posts!

module.exports = List
