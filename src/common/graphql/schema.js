export default `
scalar Date

type AccessToken {
  id: String!
  ttl: Int!
  created: Date!
  user: User!
}

type ACL {
  model: String
  property: String
  accessType: String
  permission: String
  principalType: String
  principalId: String
}

type RoleMapping {
  id: String!
  principalType: String!
  principalId: String!
  role: Role!
}

type Role {
  id: String!
  name: String!
  description: String
  created: Date
  modified: Date
}

type User {
  id: String!
  email: String!
  emailVerified: Boolean
  username: String
  realm: String
}

type BlogPost {
  id: String!
  title: String!
  slug: String!
  body: String!
  createdAt: Date!
  updatedAt: Date!
  user: User!
  blogComments: [BlogComment]
}

type BlogComment {
  id: String!
  email: String!
  body: String!
  blogPost: BlogPost!
}

# the schema allows the following query:
type Query {
  Users: [User]
  UserById(id: String!): User
  UserByEmail(email: String!): User
  UserByUsername(username: String!): User

  BlogPosts: [BlogPost]
  BlogPostById(id: String!): BlogPost
  BlogPostBySlug(slug: String!): BlogPost
}

# this schema allows the following mutation:
type Mutation {
  UserLoginWithUsername(username: String!, password: String!): AccessToken
  UserLoginWithEmail(email: String!, password: String!): AccessToken
  UserLogout(accessTokenId: String!): Boolean
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;

/*
 * TODO:
 *  - User
 *   - Query
 *   - Mutation
 *     - confirm
 *     - resetPassword
 */
