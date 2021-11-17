const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    firstname: String!
    lastname: String!
    createdAt: String!
    status: String
    phone: String
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
  type Seat {
    id: ID!
    seatNumber: Int!
    hallId: ID!
  }
  type Hall {
    id: ID!
    name: String!
    type: String!
    totalSeats: Int!
  }
  type Ticket {
    id: ID!
    sessionId: ID!
    userId: ID!
    price: String!
    status: String!
    timestamp: String!
    promocode: String!
  }
  type Session {
    id: ID!
    movieId: ID!
    hallId: ID!
    date: String!
    startTime: String!
    endTime: String!
  }
  type SessionSeat {
    id: ID!
    seatId: ID!
    sessionId: String!
    ticketId: String!
    type: String!
    status: String!
    price: Int!
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
    login(email: String!, password: String!): User!
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
