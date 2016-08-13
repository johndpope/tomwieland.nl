faker = require \faker
hl    = require \highland
log   = require \loglevel

{
  map
} = require \prelude-ls

create-blogcomment = (app, user, blogpost, cb) !-->
  app.models.BlogComment.create {
    blogpost:   blogpost
    user:       user
    email:      faker.fake '{{internet.email}}'
    body:       faker.fake '{{lorem.paragraphs}}'
    created-at: faker.fake '{{date.past}}'
    updated-at: faker.fake '{{date.past}}'
  }, cb

create-blogcomments = (app, user, blogpost, i, cb) !-->
  hl [ 1 to i ]
    .flat-map hl.wrap-callback (i, cb) !->
      create-blogcomment app, user, blogpost, cb
    .collect!
    .to-callback cb

create-blogpost = (app, user, cb) !-->
  title = faker.fake '{{name.title}}'

  error, blogpost <-! app.models.BlogPost.create {
    user:       user.id
    title:      title
    slug:       faker.helpers.slugify title
    body:       faker.fake '{{lorem.paragraphs}}'
    created-at: faker.fake '{{date.past}}'
    updated-at: faker.fake '{{date.past}}'
  }
  return cb error if error

  create-blogcomments app, user, blogpost, 10, cb

create-blogposts = (app, user, i, cb) !-->
  hl [ 1 to i ]
    .flat-map hl.wrap-callback (i, cb) !->
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
  log.debug \middleware/blog-data:created-blogposts, error, results.length
  return cb error if error

  cb!
