const Movie = require("../../models/Movie");
const Session = require("../../models/Session");
const Ticket = require("../../models/Ticket");
const SessionSeat = require("../../models/SessionSeat");
const checkAuth = require("../../utils/auth");
const { AuthenticationError, UserInputError } = require("apollo-server");
const { validateCreateMovieInput } = require("../../utils/validators");

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
    async getMovie(_, { id }) {
      try {
        const movie = await Movie.findById(id);
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
        data: {
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
          imgUrl,
        },
      },
      context
    ) {
      // const user = checkAuth(context);
      const { valid, errors } = validateCreateMovieInput(
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
        imgUrl
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }

      const existingMovie = await Movie.findOne({ name });
      if (existingMovie) {
        throw new UserInputError("This movie already exists", {
          errors: {
            email: "This movie already exists",
          },
        });
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
        imgUrl,
        createdAt: new Date().toISOString(),
      });

      const movie = await newMovie.save();

      return movie;
    },
    async deleteMovie(_, { id }, context) {
      try {
        // const user = checkAuth(context);
        const movie = await Movie.findById(id);
        if (!movie) {
          throw new Error("Movie not found");
        }
        await movie.delete();

        const sessions = await Session.find({ movieId: id });
        sessions?.map(async (session) => {
          await session?.delete();

          const tickets = await Ticket.find({ sessionId: session.id });
          tickets?.map(async (ticket) => await ticket?.delete());

          const sessionSeats = await SessionSeat.find({ sessionId: session.id });
          sessionSeats?.map(async (sessionSeat) => await sessionSeat?.delete());
        });

        return "Movie deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
    async updateMovie(_, { data }, context) {
      try {
        const { id, ...updateMovieInput } = data;
        const movie = await Movie.findById(id);
        if (!movie) {
          throw new Error("Movie not found");
        }
        const updatedMovie = await Movie.findByIdAndUpdate(
          id,
          updateMovieInput,
          {
            new: true,
          }
        );
        return updatedMovie;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
