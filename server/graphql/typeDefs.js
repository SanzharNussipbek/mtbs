const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    firstname: String!
    lastname: String!
    createdAt: String!
    status: String
    tickets: [String]
    token: String!
  }
  input RegisterInput {
    email: String!
    firstname: String!
    lastname: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
