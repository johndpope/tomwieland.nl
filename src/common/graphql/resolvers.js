export default (app) => {
  const { User, BlogPost, BlogComment } = app.models

  return {
    Query: {
      users() {
        return User
          .find({})
      },

      userById(id) {
        return User
          .findOne({ id })
      },

      userByEmail(email) {
        return User
          .findOne({ email })
      },

      userByUsername(username) {
        return User
          .findOne({ username })
      },

      blogposts() {
        return BlogPost
          .find({})
      },

      blogpostById(id) {
        return BlogPost
          .findOne({ id })
      },

      blogpostBySlug(slug) {
        return BlogPost
          .findOne({ slug })
      },
    },

    /*
    Mutation: {
      upvotePost(_, { postId }) {
      },
    },
    */

    /*
    Subscription: {
      postUpvoted(post) {
      },
    },
    */
  }
}
