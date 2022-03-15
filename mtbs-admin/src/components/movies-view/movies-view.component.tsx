import React from "react";
import MovieList from "../movie-list/movie-list.component";
import { Styled } from "./movies-view.styles";

const MoviesView: React.FC = () => {
  return (
    <Styled.Container>
      <MovieList />
    </Styled.Container>
  );
};

export default MoviesView;
