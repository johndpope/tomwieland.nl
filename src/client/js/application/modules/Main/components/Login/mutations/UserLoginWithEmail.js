import gql from 'graphql-tag'

export default gql`
  mutation UserLoginWithEmail($email: String!, $password: String!) {
    UserLoginWithEmail(email: $email, password: $password) {
      id
      ttl
      created
      user {
        id
        email
        username
      }
    }
  }
`
