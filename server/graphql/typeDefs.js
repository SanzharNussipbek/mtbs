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
    password: String
    phone: String
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
    hallId: ID!
  }
  input SeatInput {
    id: ID!
    seatNumber: Int!
    hallId: ID!
  }
  input CreateSeatInput {
    seatNumber: Int!
    hallId: ID!
  }
  input UpdateSeatInput {
    id: ID!
    seatNumber: Int
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
  type Session {
    id: ID!
    movie: Movie!
    hall: Hall!
    date: String!
    startTime: String!
    endTime: String!
  }
  input SessionInput {
    id: ID!
    movie: ID!
    hall: ID!
    date: String!
    startTime: String!
    endTime: String!
  }
  input CreateSessionInput {
    movieId: String!
    hallId: String!
    date: String!
    startTime: String!
    endTime: String!
  }
  input UpdateSessionInput {
    id: ID!
    movieId: ID!
    hallId: ID!
    date: String
    startTime: String
    endTime: String
  }
  type SessionSeat {
    id: ID!
    seat: Seat!
    type: String!
    status: String!
    price: String!
  }
  input SessionSeatInput {
    id: ID!
    seat: SeatInput!
    type: String!
    status: String!
    price: String!
  }
  input CreateSessionSeatInput {
    seatId: ID!
    type: String!
    status: String!
    price: String!
  }
  input UpdateSessionSeatInput {
    id: ID!
    seatId: ID
    type: String
    status: String
    price: String
  }
  type Ticket {
    id: ID!
    session: Session!
    seats: [SessionSeat]!
    userId: ID!
    price: String!
    status: String!
    timestamp: String!
    promocode: String
    createdAt: String!
  }
  input TicketInput {
    id: ID!
    session: SessionInput!
    seats: [SessionSeatInput]!
    userId: ID!
    price: String!
    status: String!
    timestamp: String!
    promocode: String
    createdAt: String!
  }
  input CreateTicketInput {
    sessionId: ID!
    seatIds: [ID]!
    userId: ID!
    price: String!
    status: String!
    promocode: String!
  }
  input UpdateTicketInput {
    id: ID!
    sessionId: ID
    seatIds: [ID]
    price: String
    status: String
    promocode: String
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    author: String!
    imgUrl: String
    createdAt: String!
  }
  input CreatePostInput {
    title: String!
    body: String!
    author: String!
    imgUrl: String
  }
  input UpdatePostInput {
    id: ID!
    title: String
    body: String
    author: String
    imgUrl: String
  }
  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User

    getAllMovies: [Movie]
    getMovie(id: ID!): Movie

    getAllHalls: [Hall]
    getHall(id: ID!): Hall

    getAllSeats: [Seat]
    getHallSeats(hallId: ID!): [Seat]
    getSeat(id: ID!): Seat

    getAllSessions: [Session]
    getUserSessions(userId: ID!): [Session]
    getSession(id: ID!): Session

    getAllSessionSeats: [SessionSeat]
    getOneSessionSeat(id: ID!): SessionSeat

    getAllTickets: [Ticket]
    getUserTickets(userId: ID!): [Ticket]
    getTicket(id: ID!): Ticket

    getPosts: [Post]
    getPost(id: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUser(data: UpdateUserInput): User!

    createMovie(data: CreateMovieInput): Movie!
    updateMovie(data: UpdateMovieInput): Movie!
    deleteMovie(id: ID!): String!

    createHall(data: CreateHallInput): Hall!
    updateHall(data: UpdateHallInput): Hall!
    deleteHall(id: ID!): String!

    createSeat(data: CreateSeatInput): Seat!
    updateSeat(data: UpdateSeatInput): Seat!
    deleteSeat(id: ID!): String!

    createSession(data: CreateSessionInput): Session!
    updateSession(data: UpdateSessionInput): Session!
    deleteSession(id: ID!): String!

    createSessionSeat(data: CreateSessionSeatInput): SessionSeat!
    updateSessionSeat(data: UpdateSessionSeatInput): SessionSeat!
    deleteSessionSeat(id: ID!): String!

    createTicket(data: CreateTicketInput): Ticket!
    updateTicket(data: UpdateTicketInput): Ticket!
    deleteTicket(id: ID!): String!

    createPost(data: CreatePostInput): Post!
    updatePost(data: UpdatePostInput): Post!
    deletePost(id: ID!): String!
  }
`;
