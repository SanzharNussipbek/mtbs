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
  input RegisterInput {
    email: String!
    firstname: String!
    lastname: String!
    password: String!
    confirmPassword: String!
  }
  input UpdateUserInput {
    id: ID!
    email: String
    firstname: String
    lastname: String
    phone: String
    tickets: [String]
  }
  input ChangePasswordInput {
    id: ID!
    oldPassword: String!
    newPassword: String!
  }
  type Movie {
    id: ID!
    name: String!
    description: String!
    duration: Int!
    language: String!
    releaseDate: String!
    country: String!
    genre: String!
    director: String!
    cast: String!
    rating: String!
    imgUrl: String!
    trailerUrl: String!
  }
  input MovieInput {
    id: ID!
    name: String!
    description: String!
    duration: Int!
    language: String!
    releaseDate: String!
    country: String!
    genre: String!
    director: String!
    cast: String!
    rating: String!
    imgUrl: String!
    trailerUrl: String!
  }
  input CreateMovieInput {
    name: String!
    description: String!
    duration: Int!
    language: String!
    releaseDate: String!
    country: String!
    genre: String!
    director: String!
    cast: String!
    imgUrl: String!
    rating: String!
    trailerUrl: String!
  }
  input UpdateMovieInput {
    id: ID!
    name: String
    description: String
    duration: Int
    language: String
    releaseDate: String
    country: String
    genre: String
    director: String
    cast: String
    imgUrl: String
    rating: String
    trailerUrl: String
  }
  type Seat {
    id: ID!
    seatNumber: Int!
    rowNumber: Int!
    hallId: ID!
  }
  input SeatInput {
    id: ID!
    seatNumber: Int!
    rowNumber: Int!
    hallId: ID!
  }
  input CreateSeatInput {
    seatNumber: Int!
    rowNumber: Int!
    hallId: ID!
  }
  input UpdateSeatInput {
    id: ID!
    seatNumber: Int
    rowNumber: Int
  }
  type Hall {
    id: ID!
    name: String!
    type: String!
    seats: [Seat]!
  }
  input HallInput {
    id: ID!
    name: String!
    type: String!
    seats: [SeatInput]!
  }
  input CreateHallInput {
    name: String!
    type: String!
    seatIds: [ID]!
  }
  input UpdateHallInput {
    id: ID!
    name: String
    type: String
    seatIds: [ID]
  }
  type SessionRates {
    ADULT: Int!
    STUDENT: Int
    CHILD: Int
  }
  input CreateSessionRatesInput {
    ADULT: Int!
    STUDENT: Int
    CHILD: Int
  }
  type Session {
    id: ID!
    movie: Movie!
    hall: Hall!
    datetime: Int!
    seats: [SessionSeat]!
    rates: SessionRates!
  }
  input SessionInput {
    id: ID!
    movie: ID!
    hall: ID!
    datetime: Int!
    seats: [SessionSeatInput]!
    rates: CreateSessionRatesInput!
  }
  input CreateSessionInput {
    movieId: String!
    hallId: String!
    datetime: Int!
    rates: CreateSessionRatesInput!
  }
  input UpdateSessionInput {
    id: ID!
    movieId: ID
    hallId: ID
    datetime: Int
    seats: [ID]
    rates: CreateSessionRatesInput
  }
  type SessionSeat {
    id: ID!
    seat: Seat!
    type: String!
    status: String!
  }
  input SessionSeatInput {
    id: ID!
    seat: SeatInput!
    type: String
    status: String
  }
  input CreateSessionSeatInput {
    seatId: ID!
    type: String
    status: String
  }
  input UpdateSessionSeatInput {
    id: ID!
    seatId: ID
    type: String
    status: String
  }
  input UpdateSessionSeatsInput {
    seats: [UpdateSessionSeatInput]!
  }
  type Ticket {
    id: ID!
    session: Session!
    seats: [SessionSeat]!
    userId: ID!
    price: Int!
    status: String!
    promocode: String
    createdAt: String!
  }
  input TicketInput {
    id: ID!
    session: SessionInput!
    seats: [SessionSeatInput]!
    userId: ID!
    price: Int!
    status: String!
    promocode: String
    createdAt: String!
  }
  input CreateTicketInput {
    sessionId: ID!
    seatIds: [ID]!
    userId: ID!
    price: Int!
    status: String
    promocode: String
  }
  input UpdateTicketInput {
    id: ID!
    sessionId: ID
    seatIds: [ID]
    price: Int
    status: String
    promocode: String
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    author: String!
    imgUrl: String!
    sourceUrl: String!
    createdAt: String!
  }
  input CreatePostInput {
    title: String!
    body: String!
    author: String!
    imgUrl: String!
    sourceUrl: String!
  }
  input UpdatePostInput {
    id: ID!
    title: String
    body: String
    author: String
    imgUrl: String
    sourceUrl: String
  }
  input CreateSeatsInput {
    seats: [CreateSeatInput]!
  }
  input CreateSessionsInput {
    sessions: [CreateSessionInput]!
  }
  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User

    getAllMovies: [Movie]
    getMovie(id: ID!): Movie

    getAllHalls: [Hall]
    getHall(id: ID!): Hall

    getAllSeats: [Seat]
    getSeat(id: ID!): Seat
    getSeatsByHallId(hallId: ID!): [Seat]

    getAllSessions: [Session]
    getSession(id: ID!): Session
    getSessionsByUserId(userId: ID!): [Session]
    getSessionsByMovieId(movieId: ID!): [Session]

    getAllSessionSeats: [SessionSeat]
    getSessionSeat(id: ID!): SessionSeat

    getAllTickets: [Ticket]
    getTicket(id: ID!): Ticket
    getTicketsByUserId(userId: ID!): [Ticket]

    getPosts: [Post]
    getPost(id: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUser(data: UpdateUserInput): User!
    changePassword(data: ChangePasswordInput): User!

    createMovie(data: CreateMovieInput): Movie!
    updateMovie(data: UpdateMovieInput): Movie!
    deleteMovie(id: ID!): String!

    createHall(data: CreateHallInput): Hall!
    updateHall(data: UpdateHallInput): Hall!
    deleteHall(id: ID!): String!

    createSeat(data: CreateSeatInput): Seat!
    updateSeat(data: UpdateSeatInput): Seat!
    deleteSeat(id: ID!): String!
    deleteAllSeats: String!
    createSeats(data: CreateSeatsInput): [Seat]!

    createSession(data: CreateSessionInput): Session!
    updateSession(data: UpdateSessionInput): Session!
    deleteSession(id: ID!): String!
    deleteAllSessions: String!
    createSessions(data: CreateSessionsInput): [Session]!

    createSessionSeat(data: CreateSessionSeatInput): SessionSeat!
    updateSessionSeat(data: UpdateSessionSeatInput): SessionSeat!
    updateSessionSeats(data: UpdateSessionSeatsInput): [SessionSeat]!
    deleteSessionSeat(id: ID!): String!
    deleteAllSessionSeats: String!

    createTicket(data: CreateTicketInput): Ticket!
    updateTicket(data: UpdateTicketInput): Ticket!
    payForTicket(data: UpdateTicketInput): Ticket!
    deleteTicket(id: ID!): String!

    createPost(data: CreatePostInput): Post!
    updatePost(data: UpdatePostInput): Post!
    deletePost(id: ID!): String!
  }
`;
