export default (app) => {
  const { User, BlogPost, BlogComment } = app.models

  return {
    Query: {
      users() {
        return new Promise((resolve, reject) => {
          User.find({}, (error, result) => {
            if (error) {
              return reject(error)
            }

            resolve(error)
          })
        })
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

    User: {
    },
    BlogPost: {
      blogComments() {
      },
    },
    BlogComment: {
      blogPost() {
      }
    },
  }
}
