import { gql } from "graphql-tag";

export const GET_POSTS = gql`
  {
    getPosts {
      id
      title
      author
      body
      imgUrl
      sourceUrl
      createdAt
    }
  }
`;

export const GET_ALL_MOVIES_MUTATION = gql`
  {
    getAllMovies {
      id
      name
      description
      duration
      language
      releaseDate
      country
      genre
      director
      cast
      rating
      imgUrl
      trailerUrl
    }
  }
`;

export const GET_SESSIONS_BY_MOVIE_ID = gql`
  query getSessionsByMovieId($movieId: ID!) {
    getSessionsByMovieId(movieId: $movieId) {
      id
      datetime
      movie {
        id
        name
        description
        duration
        language
        releaseDate
        country
        genre
        director
        cast
        rating
        imgUrl
        trailerUrl
      }
      hall {
        id
        name
        type
        seats {
          id
          seatNumber
          rowNumber
          hallId
        }
      }
      seats {
        id
        status
        seat {
          id
          seatNumber
          rowNumber
          hallId
        }
      }
      rates {
        ADULT
        CHILD
        STUDENT
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstname
      lastname
      email
      password
      createdAt
      status
      phone
      tickets
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register(
    $email: String!
    $firstname: String!
    $lastname: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        email: $email
        firstname: $firstname
        lastname: $lastname
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      firstname
      lastname
      email
      password
      createdAt
      status
      phone
      tickets
      token
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: ID!
    $email: String
    $firstname: String
    $lastname: String
    $password: String
    $phone: String
  ) {
    updateUser(
      data: {
        id: $id
        email: $email
        firstname: $firstname
        lastname: $lastname
        password: $password
        phone: $phone
      }
    ) {
      id
      firstname
      lastname
      email
      password
      createdAt
      status
      phone
      tickets
      token
    }
  }
`;

export const DELETE_TICKET_BY_ID = gql`
  mutation deleteTicket($id: ID!) {
    deleteTicket(id: $id)
  }
`;

export const GET_TICKETS_BY_USER_ID = gql`
  query getTicketsByUserId($userId: ID!) {
    getTicketsByUserId(userId: $userId) {
      id
      userId
      price
      status
      createdAt
      session {
        id
        datetime
        movie {
          id
          name
          description
          duration
          language
          releaseDate
          country
          genre
          director
          cast
          rating
          imgUrl
          trailerUrl
        }
        hall {
          id
          name
          type
          seats {
            id
            seatNumber
            rowNumber
            hallId
          }
        }
        seats {
          id
          status
          seat {
            id
            seatNumber
            rowNumber
            hallId
          }
        }
        rates {
          ADULT
          CHILD
          STUDENT
        }
      }
      seats {
        id
        status
        seat {
          id
          seatNumber
          rowNumber
          hallId
        }
      }
    }
  }
`;

export const UPDATE_SESSION_SEATS_MUTATION = gql`
  input UpdateSessionSeatInput {
    id: ID!
    type: String
    status: String
  }
  input UpdateSessionSeatsInput {
    seats: [UpdateSessionSeatInput]!
  }
  mutation updateSessionSeats($data: UpdateSessionSeatsInput!) {
    updateSessionSeats(data: $data) {
      id
      type
      status
      seat {
        id
        seatNumber
        rowNumber
        hallId
      }
    }
  }
`;

export const CREATE_TICKET_MUTATION = gql`
  input CreateTicketInput {
    sessionId: ID!
    seatIds: [ID]!
    userId: ID!
    price: Int!
  }

  mutation createTicket($data: CreateTicketInput) {
    createTicket(data: $data) {
      id
      userId
      price
      status
      promocode
      createdAt
      session {
        id
        datetime
        movie {
          id
          name
          description
          duration
          language
          releaseDate
          country
          genre
          director
          cast
          rating
          imgUrl
          trailerUrl
        }
        hall {
          id
          name
          type
          seats {
            id
            seatNumber
            rowNumber
            hallId
          }
        }
        seats {
          id
          status
          seat {
            id
            seatNumber
            rowNumber
            hallId
          }
        }
        rates {
          ADULT
          CHILD
          STUDENT
        }
      }
      seats {
        id
        type
        status
        seat {
          id
          seatNumber
          rowNumber
          hallId
        }
      }
    }
  }
`;
