const { SessionSeat } = require("../../models/SessionSeat");
const { Session } = require("../../models/Session");
const { Seat } = require("../../models/Seat");
const { Ticket } = require("../../models/Ticket");
const { UserInputError } = require("apollo-server");
const { validateCreateSessionSeatInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getAllSessionSeats() {
      try {
        const sessionSeats = await SessionSeat.find();
        return sessionSeats;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getSessionSeat(_, { id }) {
      try {
        const sessionSeat = await SessionSeat.findById(id);
        if (!sessionSeat) {
          throw new Error("Session seat not found");
        }
        return sessionSeat;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createSessionSeat(_, { data: { seatId, status } }, context) {
      const { valid, errors } = await validateCreateSessionSeatInput(seatId);
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const seat = await Seat.findById(seatId);

      const newSessionSeat = new SessionSeat({
        seat,
        status,
      });

      const sessionSeat = await newSessionSeat.save();

      return {
        ...sessionSeat._doc,
        id: sessionSeat.id,
      };
    },
    async deleteAllSessionSeats(_, {}, context) {
      await SessionSeat.deleteMany();
      return "All session seats are deleted successfully";
    },
    async deleteSessionSeat(_, { id }, context) {
      try {
        const sessionSeat = await SessionSeat.findById(id);
        if (!sessionSeat) {
          throw new Error("Session seat not found");
        }
        await sessionSeat.delete();
        const sessions = await Session.find();
        sessions
          ?.filter((session) => session?.seats?.indexOf(sessionSeat) !== -1)
          ?.map(async (session) => {
            const newSession = {
              ...session,
              seats: session.seats.filter((s) => s.id !== sessionSeat.id),
            };
            await Session.findByIdAndUpdate(newSession?.id, newSession);
          });
        return "Session seat deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
    async updateSessionSeat(
      _,
      { data: { id, seatId, type, status, price } },
      context
    ) {
      try {
        const sessionSeat = await SessionSeat.findById(id);
        if (!sessionSeat) {
          throw new Error("Session Seat not found");
        }

        const { valid, errors } = await validateCreateSessionSeatInput(
          seatId,
          type,
          status,
          price
        );
        if (!valid) {
          throw new UserInputError("Errors", {
            errors,
          });
        }

        const seat = await Seat.findById(seatId);

        const updateSessionSeatInput = {
          seat,
          type,
          status,
          price,
        };

        const updatedSessionSeat = await SessionSeat.findByIdAndUpdate(
          id,
          updateSessionSeatInput,
          {
            new: true,
          }
        );
        const sessions = await Session.find();
        sessions
          ?.filter((session) => session?.seats?.indexOf(sessionSeat) !== -1)
          ?.map(async (session) => {
            const newSession = {
              ...session,
              seats: session.seats.map((s) =>
                s.id === updatedSessionSeat.id ? updatedSessionSeat : s
              ),
            };
            await Session.findByIdAndUpdate(newSession?.id, newSession);
          });

        return updatedSessionSeat;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
