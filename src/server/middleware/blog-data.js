import _ from 'lodash'
import async from 'async'
import faker from 'faker'
import hl from 'highland'
import log from 'loglevel'

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getRandomDate() {
  return randomDate(new Date(2012, 0, 1), new Date())
}

function createBlogcomment(app, user, blogpost, cb) {
  app.models.BlogComment.create({
    blogpost,
    user,
    email: faker.fake('{{internet.email}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    createdAt: faker.fake('{{date.past}}'),
    updatedAt: faker.fake('{{date.past}}'),
  }, cb)
}

function createBlogcomments(app, user, blogpost, i, cb) {
  hl(_.range(1, i))
    .flatMap(hl.wrapCallback((i, cb) => {
      createBlogcomment(app, user, blogpost, cb)
    }))
    .collect()
    .toCallback(cb)
}

function createBlogpost(app, user, cb) {
  const title = faker.fake('{{name.title}}')

  const { BlogPost } = app.models

  BlogPost.create({
    user: user.id,
    title,
    slug: faker.helpers.slugify(title),
    body: faker.fake('{{lorem.paragraphs}}'),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }, (error, blogpost) => {
    if (error) {
      return cb(error)
    }

    createBlogcomments(app, user, blogpost, 10, cb)
  })
}

function createBlogposts(app, user, i, cb) {
  hl(_.range(1, i))
    .flatMap(hl.wrapCallback((i, cb) => {
      createBlogpost(app, user, cb)
    }))
    .collect()
    .toCallback(cb)
}

export default (app, cb) => {
  log.debug('middleware/blog-data')

  const {
    user,
    BlogPost,
    BlogComment,
  } = app.models

  BlogPost.findOne({ fixture: true }, (error, result) => {
    if (error) return cb(error)

    if (result) return cb()

    user.findOne({
      where: {
        username: 'admin',
      },
    }, (error, adminUser) => {
      if (error) return cb(error)

      createBlogposts(app, adminUser, 25, (error, results) => {
        if (error) return cb(error)

        cb()
      })
    })
  })
}
