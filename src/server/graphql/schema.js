/*

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

type Mutation {
  UserLoginWithUsername(username: String!, password: String!): AccessToken
  UserLoginWithEmail(email: String!, password: String!): AccessToken
  UserLogout(accessTokenId: String!): Boolean
}

*/

export default `
scalar Date

type User {
  id: String!
  email: String!
  username: String
}

type Tag {
  id: String!
  label: String!
}

type BlogPost {
  id: String!
  title: String!
  slug: String!
  body: String!
  created: Date!
  updated: Date!
  user: User!
  comments: [BlogComment]
  tags: [Tag]
}

type BlogComment {
  id: String!
  body: String!
  created: Date!
  updated: Date!
  user: User!
  blogpost: BlogPost!
}

# the schema allows the following query:
type Query {
  Users: [User]
  UserById(id: String!): User
  UserByEmail(email: String!): User
  UserByUsername(username: String!): User

  BlogPosts: [BlogPost]
  BlogPostsByUser(userId: String!): [BlogPost]
  BlogPostsByTag(tagLabel: String!): [BlogPost]
  BlogPostById(id: String!): BlogPost
  BlogPostBySlug(slug: String!): BlogPost
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
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
