const { Movie } = require("../../models/Movie");
const { Session } = require("../../models/Session");
const { SessionSeat } = require("../../models/SessionSeat");
const { Ticket } = require("../../models/Ticket");
const User = require("../../models/User");
const checkAuth = require("../../utils/auth");
const { AuthenticationError, UserInputError } = require("apollo-server");
const { validateCreateMovieInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getAllMovies() {
      try {
        const movies = await Movie.find();
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
      const { valid, errors } = await validateCreateMovieInput(
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
      });

      const movie = await newMovie.save();

      return {
        ...movie._doc,
        id: movie.id,
      };
    },
    async deleteMovie(_, { id }, context) {
      try {
        const movie = await Movie.findById(id);
        if (!movie) {
          throw new Error("Movie not found");
        }

        const sessions = await Session.find();
        sessions
          ?.filter((session) => session?.movie?.id == movie?.id)
          ?.map(async (session) => {
            const tickets = await Ticket.find();
            tickets
              ?.filter((ticket) => ticket?.session?.id == session?.id)
              ?.map(async (ticket) => {
                const user = await User.findById(ticket?.userId);
                const newTickets = user?.tickets?.filter(
                  (id) => id !== ticket?.id
                );
                await User.findByIdAndUpdate(user.id, { tickets: newTickets });
                await ticket?.delete();
              });

            session?.seats?.map(async (seat) => {
              const theSeat = await SessionSeat.findById(seat?.id);
              await theSeat?.delete();
            });

            await session?.delete();
          });

        await movie.delete();

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
        const sessions = await Session.find();
        sessions
          ?.filter((session) => session?.movie?.id == updatedMovie?.id)
          ?.map(async (session) => {
            const newSession = { ...session, movie: updatedMovie };
            await Session.findByIdAndUpdate(newSession?.id, newSession);
          });
        return updatedMovie;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
