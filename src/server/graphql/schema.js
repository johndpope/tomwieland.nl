export default `
scalar Date

type User {
  id: String!
  email: String!
  username: String!
}

type Tag {
  id: String!
  label: String!
}

type Article {
  id: String!
  title: String!
  slug: String!
  body: String!
  created: Date!
  updated: Date!
  user: User!
  comments: [Comment]
  tags: [Tag]
}

type Comment {
  id: String!
  body: String!
  created: Date!
  updated: Date!
  user: User!
  article: Article!
}


# the schema allows the following query:
type Query {
  Users: [User]
  UserById(id: String!): User
  UserByEmail(email: String!): User
  UserByUsername(username: String!): User

  Articles: [Article]
  ArticlesByUserId(userId: String!): [Article]
  ArticlesByTag(tagLabel: String!): [Article]
  ArticleById(id: String!): Article
  ArticleBySlug(slug: String!): Article
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
}
`
