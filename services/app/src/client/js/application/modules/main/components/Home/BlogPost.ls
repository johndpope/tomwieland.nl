React  = require \react
log    = require \loglevel
moment = require \moment

el = React~create-element

{
  Col
  Grid
  Row
  Panel
} = require \react-bootstrap

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

    el Row,
      style:
        margin-top: 15,
        margin-bottom: 10,

      el Col,
        xs: 4,

        el \div,
          style:
            float: \right,

          el \h1,
            style:
              float: \left
              margin-top: 1,
              margin-left: 0,
              margin-right: 0,
              margin-bottom: 0,

            day

          el \div,
            style:
              float: \right,

            el \h4,
              style:
                margin: 0,

              month

            el \h4,
              style:
                margin: 0,

              year

      el Col,
        xs: 8,

        el \div,
          style:
            margin-top: 8
            height: 50,

          el \div,
            style:
              # Makes the border go under the text only
              position: \absolute
              height: 45
              #border-bottom: '1px solid #000',

            el \h2,
              style:
                margin: 0,

              el \a,
                href: "#/blog/#{id}"
                style:
                  color: \#000000
                  text-decoration: \none,

                title

module.exports = BlogPost
