import { gql } from "graphql-tag";

export const GET_ALL_MOVIES = gql`
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

export const GET_MOVIE_BY_ID = gql`
  query getMovie($id: ID!) {
    getMovie(id: $id) {
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

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id)
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updateMovie(
    id: ID!
    name: String
    description: String
    duration: Int
    language: String
    releaseDate: String
    country: String
    genre: String
    director: String
    cast: String
    imgUrl: String
    rating: String
    trailerUrl: String
  ) {
    updateMovie(data: {
      id: $id
      name: $name
      description: $description
      duration: $duration
      language: $language
      releaseDate: $releaseDate
      country: $country
      genre: $genre
      director: $director
      cast: $cast
      imgUrl: $imgUrl
      rating: $rating
      trailerUrl: $trailerUrl
    }) {
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

export const CREATE_MOVIE = gql`
  mutation createMovie(
    name: String!
    description: String!
    duration: Int!
    language: String!
    releaseDate: String!
    country: String!
    genre: String!
    director: String!
    cast: String!
    imgUrl: String!
    rating: String!
    trailerUrl: String!
  ) {
    createMovie(data: {
      name: $name
      description: $description
      duration: $duration
      language: $language
      releaseDate: $releaseDate
      country: $country
      genre: $genre
      director: $director
      cast: $cast
      imgUrl: $imgUrl
      rating: $rating
      trailerUrl: $trailerUrl
    }) {
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
