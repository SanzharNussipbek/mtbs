import { PayloadAction } from '@reduxjs/toolkit';
import { Movie} from '../../types/types';
import { MovieState } from './movie.slice';

const reducers = {
  setMovie: (state: MovieState, action: PayloadAction<Movie | null>) => {
    state.movie = action.payload;
    return state;
  },
  setMovieList: (state: MovieState, action: PayloadAction<Movie[]>) => {
    state.movieList = action.payload;
    return state;
  },
};

export default reducers;
