import { gql } from "graphql-tag";

export const GET_ALL_TICKETS = gql`
  {
    getAllTickets {
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

export const GET_TICKET_BY_ID = gql`
  query getTicket($id: ID!) {
    getTicket(id: $id) {
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

export const CREATE_TICKET = gql`
  mutation createTicket(
    $sessionId: ID!
    $seatIds: [ID]!
    $userId: ID!
    $price: Int!
  ) {
    createTicket(
      data: {
        sessionId: $sessionId
        seatIds: $seatIds
        userId: $userId
        price: $price
      }
    ) {
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

export const PAY_FOR_TICKET = gql`
  mutation payForTicket($id: ID!, $price: Int!) {
    payForTicket(data: { id: $id, price: $price }) {
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

export const UPDATE_TICKET = gql`
  mutation updateTicket(
    $id: ID!
    $sessionId: ID
    $seatIds: [ID]
    $price: Int
    $status: String
    $promocode: String
  ) {
    updateTicket(
      data: {
        id: $id
        price: $price
        sessionId: $sessionId
        status: $status
        seatIds: $seatIds
        promocode: $promocode
      }
    ) {
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

export const DELETE_TICKET = gql`
  mutation deleteTicket($id: ID!) {
    deleteTicket(id: $id)
  }
`;
