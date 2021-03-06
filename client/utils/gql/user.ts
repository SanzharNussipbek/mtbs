import { gql } from "graphql-tag";

export const GET_ALL_USERS = gql`
  {
    getAllUsers {
      id
      firstname
      lastname
      email
      password
      createdAt
      status
      phone
      tickets
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstname
      lastname
      email
      password
      createdAt
      status
      phone
      tickets
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $email: String
    $firstname: String
    $lastname: String
    $phone: String
  ) {
    updateUser(
      data: {
        id: $id
        email: $email
        firstname: $firstname
        lastname: $lastname
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

export const LOGIN_USER = gql`
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

export const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $firstname: String!
    $lastname: String!
    $phone: String
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        email: $email
        firstname: $firstname
        lastname: $lastname
        phone: $phone
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

export const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $id: ID!
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      data: { id: $id, oldPassword: $oldPassword, newPassword: $newPassword }
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
