import { gql } from "graphql-tag";
// import { gql } from "@apollo/client";

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
