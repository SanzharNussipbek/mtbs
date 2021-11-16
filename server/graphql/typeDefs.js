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
  type Movie {
    id: ID!
    name: String!
    description: String!
    duration: String!
    language: String!
    releaseDate: String!
    country: String!
    genre: String!
    director: String!
    cast: String!
    rating: String!
    createdAt: String!
  }
  input RegisterInput {
    email: String!
    firstname: String!
    lastname: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getMovies: [Movie]
    getMovie(movieId: ID!): Movie
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createMovie(
      name: String!
      description: String!
      duration: String!
      language: String!
      releaseDate: String!
      country: String!
      genre: String!
      director: String!
      cast: String!
      rating: String!
    ): Movie!
    deleteMovie(movieId: ID!): String!
  }
`;
