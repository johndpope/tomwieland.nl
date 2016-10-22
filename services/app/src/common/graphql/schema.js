export default `
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
  users: [User]
  userById(id: String!): User
  userByEmail(email: String!): User
  userByUsername(username: String!): User
  
  blogposts: [BlogPost]
  blogpostById(id: String!): BlogPost
  blogpostBySlug(slug: String!): BlogPost
}

# this schema allows the following mutation:
#type Mutation {
#}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  #mutation: Mutation
}
`;
