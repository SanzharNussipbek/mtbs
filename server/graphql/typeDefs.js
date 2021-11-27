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
    imgUrl: String!
    createdAt: String!
  }
  type Seat {
    id: ID!
    seatNumber: Int!
    hallId: ID!
    createdAt: String!
  }
  type Hall {
    id: ID!
    name: String!
    type: String!
    totalSeats: Int!
    createdAt: String!
  }
  type Ticket {
    id: ID!
    sessionId: ID!
    userId: ID!
    price: String!
    status: String!
    timestamp: String!
    promocode: String
    createdAt: String!
  }
  type Session {
    id: ID!
    movieId: ID!
    hallId: ID!
    date: String!
    startTime: String!
    endTime: String!
    createdAt: String!
  }
  type SessionSeat {
    id: ID!
    seatId: ID!
    sessionId: String!
    ticketId: String!
    type: String!
    status: String!
    price: String!
    createdAt: String!
  }
  input RegisterInput {
    email: String!
    firstname: String!
    lastname: String!
    password: String!
    confirmPassword: String!
  }
  input UpdateUserInput {
    email: String
    firstname: String
    lastname: String
    password: String
    phone: String
  }
  input CreateMovieInput {
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
  }
  input CreateHallInput {
    name: String!
    type: String!
    totalSeats: Int!
  }
  input CreateSeatInput {
    seatNumber: Int!
    hallId: ID!
  }
  input CreateSessionInput {
    movieId: ID!
    hallId: ID!
    date: String!
    startTime: String!
    endTime: String!
  }
  input CreateSessionSeatInput {
    seatId: ID!
    sessionId: String!
    ticketId: String!
    type: String!
    status: String!
    price: String!
  }
  input CreateTicketInput {
    sessionId: ID!
    userId: ID!
    price: String!
    status: String!
    timestamp: String!
    promocode: String!
  }
  input CreateMovieInput {
    name: String!
    description: String!
    duration: String!
    language: String!
    releaseDate: String!
    country: String!
    genre: String!
    director: String!
    cast: String!
    imgUrl: String!
    rating: String!
  }
  type Query {
    getMovies: [Movie]
    getMovie(id: ID!): Movie
    getHalls: [Hall]
    getHall(id: ID!): Hall
    getSeats: [Seat]
    getSeat(id: ID!): Seat
    getSessions: [Session]
    getSession(id: ID!): Session
    getSessionSeats: [SessionSeat]
    getSessionSeat(id: ID!): SessionSeat
    getTickets: [Ticket]
    getTicket(id: ID!): Ticket
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUser(updateUserInput: UpdateUserInput): User!

    createMovie(data: CreateMovieInput): Movie!
    deleteMovie(id: ID!): String!

    createHall(data: CreateHallInput): Hall!
    deleteHall(id: ID!): String!

    createSeat(data: CreateSeatInput): Seat!
    deleteSeat(id: ID!): String!

    createSession(data: CreateSessionInput): Session!
    deleteSession(id: ID!): String!

    createSessionSeat(data: CreateSessionSeatInput): SessionSeat!
    deleteSessionSeat(id: ID!): String!

    createTicket(data: CreateTicketInput): Ticket!
    deleteTicket(id: ID!): String!
  }
`;
