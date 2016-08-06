faker = require \faker
hl    = require \highland
log   = require \loglevel

{
  map
} = require \prelude-ls

create-blogcomment = (app, user, blogpost, cb) !-->
  log.debug \middleware/blog-data:create-blogcomment

  app.models.BlogComment.create {
    blogpost: blogpost
    user:     user
    email:    faker.fake '{{internet.email}}'
    body:     faker.fake '{{lorem.paragraphs}}'
  }, cb

create-blogcomments = (app, user, blogpost, i, cb) !-->
  log.debug \middleware/blog-data:create-blogcomments

  hl [ 1 to i ]
    .flat-map hl.wrap-callback (i, cb) !->
      log.debug \middleware/blog-data:create-blogcomments:flat-map, i
      create-blogcomment app, user, blogpost, cb
    .collect!
    .to-callback cb

create-blogpost = (app, user, cb) !-->
  log.debug \middleware/blog-data:create-blog-post

  error, blogpost <-! app.models.BlogPost.create {
    user:  user.id
    title: faker.fake '{{name.title}}'
    body:  faker.fake '{{lorem.paragraphs}}'
  }
  log.debug \middleware/blog-data:create-blog-post:blogpost, error, blogpost
  return cb error if error

  create-blogcomments app, user, blogpost, 10, cb

create-blogposts = (app, user, i, cb) !-->
  log.debug \middleware/blog-data:create-blog-posts

  hl [ 1 to i ]
    .flat-map hl.wrap-callback (i, cb) !->
      log.debug \middleware/blog-data:create-blogposts:flat-map, i
      create-blogpost app, user, cb
    .collect!
    .to-callback cb

module.exports = (app, cb) !->
  log.debug \middleware/blog-data

  {
    user
    BlogPost
    BlogComment
  } = app.models

  # Find the admin user.
  error, admin-user <-! user.find-one where: username: \admin
  log.debug \middleware/blog-data:admin-user, error, admin-user
  return cb error if error

  # Destroy all blog posts.
  error <-! BlogPost.destroy-all {}
  log.debug \middleware/blog-data:destroyed-blogposts, error
  return cb error if error

  # Destroy all blog comments.
  error <-! BlogComment.destroy-all {}
  log.debug \middleware/blog-data:destroyed-blogcomments, error
  return cb error if error

  # Recreate them.
  error, results <-! create-blogposts app, admin-user, 25
  log.debug \middleware/blog-data:results, error, results.length
  return cb error if error

  cb!
