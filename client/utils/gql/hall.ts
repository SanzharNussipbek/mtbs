import { gql } from "graphql-tag";

export const GET_ALL_HALLS = gql`
  {
    getAllHalls {
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
  }
`;

export const GET_HALL_BY_ID = gql`
  query getHall($id: ID!) {
    getHall(id: $id) {
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
  }
`;

export const DELETE_HALL = gql`
  mutation deleteHall($id: ID!) {
    deleteHall(id: $id)
  }
`;

export const UPDATE_HALL = gql`
  mutation updateHall($id: ID!, $name: String, $type: String, $seatIds: [ID]) {
    updateHall(data: { id: $id, name: $name, type: $type, seatIds: $seatIds }) {
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
  }
`;

export const CREATE_HALL = gql`
  mutation createHall($name: String!, $type: String!, $seatIds: [ID]!) {
    createHall(data: { name: $name, type: $type, seatIds: $seatIds }) {
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
  }
`;
