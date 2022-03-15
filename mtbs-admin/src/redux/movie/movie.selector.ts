import { createSelector } from "reselect";
import { RootState } from "../store";

const movieState = (state: RootState) => state.movie;

export const selectMovie = createSelector(
  [movieState],
  (movieState) => movieState.movie
);

export const selectMovieList = createSelector(
  [movieState],
  (movieState) => movieState.movieList
);
