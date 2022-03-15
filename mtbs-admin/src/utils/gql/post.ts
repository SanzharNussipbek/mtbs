import { gql } from "graphql-tag";

export const GET_ALL_POSTS = gql`
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

export const GET_POST_BY_ID = gql`
  query getPost($id: ID!) {
    getPost(id: $id) {
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

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $id: ID!
    $title: String
    $body: String
    $author: String
    $imgUrl: String
    $sourceUrl: String
  ) {
    updatePost(
      data: {
        id: $id
        title: $title
        body: $body
        author: $author
        imgUrl: $imgUrl
        sourceUrl: $sourceUrl
      }
    ) {
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

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $author: String!
    $imgUrl: String!
    $sourceUrl: String!
  ) {
    createPost(
      data: {
        title: $title
        body: $body
        author: $author
        imgUrl: $imgUrl
        sourceUrl: $sourceUrl
      }
    ) {
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
