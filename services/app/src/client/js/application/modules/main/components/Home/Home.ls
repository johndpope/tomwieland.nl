React = require \react
el = React~create-element
log = require \loglevel

{
  map
} = require \prelude-ls

{
  Col
  Grid
  Row
} = require \react-bootstrap

BlogPost = require \./BlogPost

class Home extends React.Component
  component-will-mount: ->
    { token } = @props.session

    log.debug \modules/main/components/Home#component-will-mount, token

    @props.handle-list token

  render-blog-posts: ->
    { entries } = @props.blogposts

    log.debug \modules/main/components/Home#render-blog-posts, entries

    map ((entry) ->
      el BlogPost,
        key:        entry.id
        event-key:  entry.id
        id:         entry.id
        userId:     entry.userId
        title:      entry.title
        body:       entry.body
        created-at: entry.created-at
        updated-at: entry.updated-at
    ), entries

  render: ->
    log.debug \modules/main/components/Home#render

    el Grid,
      style:
        margin-top: \81px,

      el Row, void,
        el Col,
          xs: 12,

          @render-blog-posts!

      el Row,
        style:
          margin-top: 20,

        el Col,
          xs: 12
          style:
            text-align: \center,

          el \a,
            href: "#/blog",

            \Archive



module.exports = Home
