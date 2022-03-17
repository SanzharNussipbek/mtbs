import { gql } from "graphql-tag";

export const GET_ALL_SESSIONS = gql`
  {
    getAllSessions {
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

export const GET_SESSION_BY_ID = gql`
  query getSession($id: ID!) {
    getSession(id: $id) {
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
export const GET_SESSIONS_BY_USER_ID = gql`
  query getSessionsByUserId($userId: ID!) {
    getSessionsByUserId(userId: $userId) {
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

export const DELETE_SESSION = gql`
  mutation deleteSession($id: ID!) {
    deleteSession(id: $id)
  }
`;

export const DELETE_ALL_SESSIONS = gql`
  mutation deleteAllSessions {
    deleteAllSessions
  }
`;

export const UPDATE_SESSION = gql`
  mutation updateSession(
    $id: ID!
    $movieId: ID
    $hallId: ID
    $datetime: Int
    $seats: [ID]
    $adultRate: Int!
    $studentRate: Int!
    $childRate: Int!
  ) {
    updateSession(
      data: {
        id: $id
        movieId: $movieId
        hallId: $hallId
        datetime: $datetime
        seats: $seats
        adultRate: $adultRate
        studentRate: $studentRate
        childRate: $childRate
      }
    ) {
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

export const CREATE_SESSION = gql`
  mutation createSession(
    $movieId: String!
    $hallId: String!
    $datetime: Int!
    $adultRate: Int!
    $studentRate: Int!
    $childRate: Int!
  ) {
    createSession(
      data: {
        movieId: $movieId
        hallId: $hallId
        datetime: $datetime
        adultRate: $adultRate
        studentRate: $studentRate
        childRate: $childRate
      }
    ) {
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
