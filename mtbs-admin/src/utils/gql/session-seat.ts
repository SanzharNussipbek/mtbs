import { gql } from "graphql-tag";

export const GET_ALL_SESSION_SEATS = gql`
  {
    getAllSessionSeats {
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
`;

export const GET_SESSION_SEAT_BY_ID = gql`
  query getSessionSeat($id: ID!) {
    getSessionSeat(id: $id) {
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
`;

export const DELETE_SESSION_SEAT = gql`
  mutation deleteSessionSeat($id: ID!) {
    deleteSessionSeat(id: $id)
  }
`;

export const DELETE_ALL_SESSION_SEATS = gql`
  mutation deleteAllSessionSeats {
    deleteAllSessionSeats
  }
`;

export const UPDATE_SESSION_SEAT = gql`
  mutation updateSessionSeat(
    $id: ID!
    $seatId: ID
    $type: String
    $status: String
  ) {
    updateSessionSeat(
      data: { id: $id, seatId: $seatId, type: $type, status: $status }
    ) {
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
`;

export const CREATE_SESSION_SEAT = gql`
  mutation createSessionSeat($seatId: ID!, $type: String, $status: String) {
    createSessionSeat(data: { seatId: $seatId, type: $type, status: $status }) {
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
`;
