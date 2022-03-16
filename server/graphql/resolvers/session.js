const { Session } = require("../../models/Session");
const { SessionSeat } = require("../../models/SessionSeat");
const { Ticket } = require("../../models/Ticket");
const { Movie } = require("../../models/Movie");
const { Hall } = require("../../models/Hall");
const { Seat } = require("../../models/Seat");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");
const { validateCreateSessionInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getAllSessions() {
      try {
        const sessions = await Session.find();
        return sessions;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getSession(_, { id }) {
      try {
        const session = await Session.findById(id);
        if (!session) {
          throw new Error("Session not found");
        }
        return session;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getSessionsByUserId(_, { userId }) {
      try {
        const sessions = await Session.find({ userId });
        return sessions;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getSessionsByMovieId(_, { movieId }) {
      try {
        const movie = await Movie.findById(movieId);
        const sessions = await Session.find({ movie });
        return sessions;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createSession(
      _,
      {
        data: { movieId, hallId, datetime, adultRate, studentRate, childRate },
      },
      context
    ) {
      const { valid, errors } = await validateCreateSessionInput(
        movieId,
        hallId,
        datetime,
        adultRate,
        studentRate,
        childRate
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const movie = await Movie.findById(movieId);
      const hall = await Hall.findById(hallId);
      const seats = await Seat.find({ hallId });

      let sessionSeats = [];
      for (let i = 0; i < seats?.length; i++) {
        const seat = seats[i];
        const newSessionSeat = new SessionSeat({
          seat: seat,
          status: "VACANT",
          type: "",
        });
        const sessionSeat = await newSessionSeat.save();
        sessionSeats.push(sessionSeat);
      }

      const newSession = new Session({
        movie: movie,
        hall: hall,
        seats: sessionSeats,
        datetime,
        rates: {
          ADULT: adultRate,
          STUDENT: studentRate,
          CHILD: childRate,
        },
      });

      const session = await newSession.save();

      return {
        ...session._doc,
        id: session.id,
      };
    },
    async createSessions(_, { data }, context) {
      if (!data.sessions.length) return [];
      let sessions = [];
      for (let i = 0; i < data.sessions.length; i++) {
        const sessionData = data.sessions[i];
        const movie = await Movie.findById(sessionData.movieId);
        const hall = await Hall.findById(sessionData.hallId);
        const seats = await Seat.find({ hallId: sessionData.hallId });
        let sessionSeats = [];
        for (let i = 0; i < seats?.length; i++) {
          const seat = seats[i];
          const newSessionSeat = new SessionSeat({
            seat: seat,
            status: "VACANT",
          });
          const sessionSeat = await newSessionSeat.save();
          sessionSeats.push(sessionSeat);
        }

        const newSession = new Session({
          movie: movie,
          hall: hall,
          seats: sessionSeats,
          datetime: sessionData.datetime,
          rates: {
            ADULT: sessionData.adultRate,
            STUDENT: sessionData.studentRate,
            CHILD: sessionData.childRate,
          },
        });

        const session = await newSession.save();
        sessions.push(session);
      }

      return sessions;
    },
    async deleteAllSessions(_, {}, context) {
      await Session.deleteMany();
      return "All sessions are deleted successfully";
    },
    async deleteSession(_, { id }, context) {
      try {
        const session = await Session.findById(id);
        if (!session) {
          throw new Error("Session not found");
        }

        const tickets = await Ticket.find();
        tickets
          ?.filter((ticket) => ticket?.session?.id == session?.id)
          ?.map(async (ticket) => {
            const user = await User.findById(ticket?.userId);
            const newTickets = user?.tickets?.filter((id) => id !== ticket?.id);
            await User.findByIdAndUpdate(user.id, { tickets: newTickets });
            await ticket?.delete();
          });

        session?.seats?.map(async (seat) => {
          await SessionSeat.findByIdAndDelete(seat?.id);
        });

        await session.delete();

        return "Session deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
    async updateSession(
      _,
      {
        data: {
          id,
          movieId,
          hallId,
          datetime,
          adultRate,
          studentRate,
          childRate,
        },
      },
      context
    ) {
      try {
        const session = await Session.findById(id);
        if (!session) {
          throw new Error("Session not found");
        }

        const movie = await Movie.findById(movieId);
        const hall = await Hall.findById(hallId);

        const updateSessionInput = {
          movie,
          hall,
          datetime,
          rates: {
            ADULT: adultRate ?? session?.rates?.ADULT,
            STUDENT: studentRate ?? session?.rates?.STUDENT,
            CHILD: childRate ?? session?.rates?.CHILD,
          },
        };
        const updatedSession = await Session.findByIdAndUpdate(
          id,
          updateSessionInput,
          {
            new: true,
          }
        );

        const tickets = await Ticket.find();
        tickets
          ?.filter((ticket) => ticket?.session?.id == updatedSession?.id)
          ?.map(async (ticket) => {
            const newTicket = { ...ticket, session: updatedSession };
            await Ticket.findByIdAndUpdate(newTicket?.id, newTicket);
          });

        return updatedSession;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
