const Movie = require("../../models/Movie");
const checkAuth = require("../../utils/auth");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    async getMovies() {
      try {
        const movies = await Movie.find()?.sort({ createdAt: -1 });
        return movies;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getMovie(_, { movieId }) {
      try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
          throw new Error("Movie not found");
        }
        return movie;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createMovie(
      _,
      {
        name,
        description,
        duration,
        language,
        releaseDate,
        country,
        genre,
        director,
        cast,
        rating,
      },
      context
    ) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      const newMovie = new Movie({
        name,
        description,
        duration,
        language,
        releaseDate,
        country,
        genre,
        director,
        cast,
        rating,
        createdAt: new Date().toISOString(),
      });

      const movie = await newMovie.save();

      return Movie;
    },
    async deleteMovie(_, { movieId }, context) {
      try {
        const user = checkAuth(context);
        const movie = await Movie.findById(movieId);
        if (!movie) {
          throw new Error("Movie not found");
        }
        await movie.delete();
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
