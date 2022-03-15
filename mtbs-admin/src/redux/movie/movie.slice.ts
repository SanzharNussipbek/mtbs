import { createSlice } from '@reduxjs/toolkit';
import { Movie } from "../../types/types";
import reducers from './movie.reducer';

export interface MovieState {
  movie: Movie | null;
  movieList: Movie[];
};

export const initialState: MovieState = {
  movie: null,
  movieList: [],
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers,
});

export const {
  setMovie,
  setMovieList,
} = movieSlice.actions;

export default movieSlice.reducer;
