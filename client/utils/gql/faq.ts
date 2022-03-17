import { gql } from "graphql-tag";

export const GET_ALL_FAQ = gql`
  {
    getFaqs {
      id
      title
      body
      createdAt
    }
  }
`;

export const GET_FAQ_BY_ID = gql`
  query getFaq($id: ID!) {
    getFaq(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`;

export const DELETE_FAQ = gql`
  mutation deleteFaq($id: ID!) {
    deleteFaq(id: $id)
  }
`;

export const UPDATE_FAQ = gql`
  mutation updateFaq($id: ID!, $title: String, $body: String) {
    updateFaq(data: { id: $id, title: $title, body: $body }) {
      id
      title
      body
      createdAt
    }
  }
`;

export const CREATE_FAQ = gql`
  mutation createFaq($title: String!, $body: String!) {
    createFaq(data: { title: $title, body: $body }) {
      id
      title
      body
      createdAt
    }
  }
`;
