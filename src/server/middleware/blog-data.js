import _ from 'lodash'
import faker from 'faker'
import hl from 'highland'
import log from 'loglevel'

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
    createdAt: faker.fake('{{date.past}}'),
    updatedAt: faker.fake('{{date.past}}')
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

  user.findOne({
    where: {
      username: 'admin',
    },
  }, (error, adminUser) => {
    log.debug('middleware/blog-data:admin-user', error, adminUser)

    if (error) {
      return cb(error)
    }

    BlogPost.destroyAll({}, (error) => {
      log.debug('middleware/blog-data:destroyed-blogposts', error)

      if (error) {
        return cb(error)
      }

      BlogComment.destroyAll({}, (error) => {
        log.debug('middleware/blog-data:destroyed-blogcomments', error)

        if (error) {
          return cb(error)
        }

        createBlogposts(app, adminUser, 25, (error, results) => {
          log.debug('middleware/blog-data:created-blogposts', error, results.length)

          if (error) {
            return cb(error)
          }

          cb()
        })
      })
    })
  })
}
