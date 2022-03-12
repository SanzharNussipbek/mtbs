import { gql } from "graphql-tag";

export const GET_ALL_SEATS = gql`
  {
    getAllSeats {
      id
      seatNumber
      rowNumber
      hallId
    }
  }
`;

export const GET_SEAT_BY_ID = gql`
  query getSeat($id: ID!) {
    getSeat(id: $id) {
      id
      seatNumber
      rowNumber
      hallId
    }
  }
`;

export const GET_SEAT_BY_HALL_ID = gql`
  query getSeatsByHallId($hallId: ID!) {
    getSeatsByHallId(hallId: $id) {
      id
      seatNumber
      rowNumber
      hallId
    }
  }
`;

export const DELETE_SEAT = gql`
  mutation deleteSeat($id: ID!) {
    deleteSeat(id: $id)
  }
`;

export const DELETE_ALL_SEATS = gql`
  mutation deleteAllSeats() {
    deleteAllSeats
  }
`;

export const UPDATE_SEAT = gql`
  mutation updateSeat(
    id: ID!
    seatNumber: Int
    rowNumber: Int
  ) {
    updateSeat(data: {
      id: $id
      seatNumber: $seatNumber
      rowNumber: $rowNumber
    }) {
      id
      seatNumber
      rowNumber
      hallId
    }
  }
`;

export const CREATE_SEAT = gql`
  mutation createSeat(
    seatNumber: Int!
    rowNumber: Int!
    hallId: ID!
  ) {
    createSeat(data: {
      seatNumber: $seatNumber
      rowNumber: $rowNumber
      hallId: $hallId
    }) {
      id
      seatNumber
      rowNumber
      hallId
    }
  }
`;
