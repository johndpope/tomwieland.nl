import { Kind } from 'graphql/language'

export default (app) => {
  const { User, BlogPost, BlogComment } = app.models

  return {
    Date: {
      __parseValue(value) {
        return new Date(value); // value from the client
      },
      __serialize(value) {
        return value.getTime(); // value sent to the client
      },
      __parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
      },
    },

    AccessToken: {
      user(root, args, context) {
        return User
          .findOne({ id: root.user })
      },
    },

    BlogPost: {
      user(root, args, context) {
        return User
          .findOne({ id: root.user })
      },
      blogComments(root, args, context) {
        return BlogComment
          .find({ blogPost: root.id })
      },
    },

    BlogComment: {
      blogPost(root, args, context) {
        return BlogPost
          .findOne({
            id: root.blogPost,
          })
      },
    },

    Query: {
      Users() {
        return User
          .find({})
      },

      UserById(id) {
        return User
          .findOne({ id })
      },

      UserByEmail(email) {
        return User
          .findOne({ email })
      },

      UserByUsername(username) {
        return User
          .findOne({ username })
      },

      BlogPosts() {
        return BlogPost
          .find({})
      },

      BlogPostById(id) {
        return BlogPost
          .findOne({ id })
      },

      BlogPostBySlug(slug) {
        return BlogPost
          .findOne({ slug })
      },
    },

    Mutation: {
      UserLoginWithEmail(_, { email, password }) {
        return User.login({ email, password })
      },

      UserLoginWithUsername(_, { username, password }) {
        return User.login({ username, password })
      },

      UserLogout(_, { accessTokenId }) {
        return User.logout(accessTokenId)
      },
    },

    /*
    Subscription: {
      postUpvoted(post) {
      },
    },
    */
  }
}
