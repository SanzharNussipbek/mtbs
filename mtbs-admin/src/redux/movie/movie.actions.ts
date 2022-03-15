import { Movie } from "../../types/types";
import { setMovie, setMovieList } from "./movie.slice";

export function updateMovie(movie: Movie | null) {
  return setMovie(movie);
};

export function updateMovieList(movieList: Movie[]) {
  return setMovieList(movieList);
};
