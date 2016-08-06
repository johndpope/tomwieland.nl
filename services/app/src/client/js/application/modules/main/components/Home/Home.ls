React           = require \react
create-element  = require \../../../../../library/create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap
{ map }         = require \prelude-ls

grid      = create-element react-bootstrap.Grid
row       = create-element react-bootstrap.Row
col       = create-element react-bootstrap.Col
a         = create-element \a
div       = create-element \div
blog-post = create-element require \./BlogPost

class Home extends React.Component
  component-will-mount: ->
    { token } = @props.session

    log.debug \modules/main/components/Home#component-will-mount, token

    @props.handle-list token

  render-blog-posts: ->
    { entries } = @props.blogposts

    log.debug \modules/main/components/Home#render-blog-posts, entries

    map (->
      blog-post do
        key:        it.id
        event-key:  it.id
        id:         it.id
        userId:     it.userId
        title:      it.title
        body:       it.body
        created-at: it.created-at
        updated-at: it.updated-at
    ), entries

  render: ->
    log.debug \modules/main/components/Home#render

    grid void,
      row void,
        col xs: 12, @render-blog-posts!
      row void,
        col xs: 12, style: text-align: \center,
          div style: margin-top: 20, margin-bottom: 50,
            a href: "#/blog",
              \Archive

module.exports = Home
