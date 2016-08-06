React           = require \react
create-element  = require \../../../../../library/create-element
log             = require \loglevel
moment          = require \moment
react-bootstrap = require \react-bootstrap

a         = create-element \a
blog-post = create-element require \./BlogPost
col       = create-element react-bootstrap.Col
div       = create-element \div
grid      = create-element react-bootstrap.Grid
h1        = create-element \h1
h2        = create-element \h2
h4        = create-element \h4
panel     = create-element react-bootstrap.Panel
row       = create-element react-bootstrap.Row

class BlogPost extends React.Component
  render: ->
    {
      id
      user-id
      title
      body
      created-at
      updated-at
    } = @props

    month = moment created-at .format 'MMM'
    day   = moment created-at .format 'Do'
    year  = moment created-at .format 'YYYY'

    row style: margin-top: 15, margin-bottom: 10,
      col xs: 4,
        div style: float: \right,
          h1 style: float: \left, margin-top: 1, margin-left: 0, margin-right: 0, margin-bottom: 0, day
          div style: float: \right,
            h4 style: margin: 0, month
            h4 style: margin: 0, year
      col xs: 8,
        div style: margin-top: 8, height: 50,
          div style: position: \absolute, height: 45,
            h2 style: margin: 0,
              a href: "#/blog/#{id}", style: color: \#000000, text-decoration: \none, title

module.exports = BlogPost

