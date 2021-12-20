const { SessionSeat } = require("../../models/SessionSeat");
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
    async getOneSessionSeat(_, { id }) {
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
    async createSessionSeat(
      _,
      { data: { seatId, type, status, price } },
      context
    ) {
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

      const newSessionSeat = new SessionSeat({
        seat,
        type,
        status,
        price,
      });

      const sessionSeat = await newSessionSeat.save();

      return {
        ...sessionSeat._doc,
        id: sessionSeat.id,
      };
    },
    async deleteSessionSeat(_, { id }, context) {
      try {
        const sessionSeat = await SessionSeat.findById(id);
        if (!sessionSeat) {
          throw new Error("Session seat not found");
        }
        await sessionSeat.delete();
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
        const tickets = await Ticket.find();
        tickets
          ?.filter((ticket) => ticket?.seats?.indexOf(sessionSeat) !== -1)
          ?.map(async (ticket) => {
            const newTicket = {
              ...ticket,
              seats: ticket.seats.map((s) =>
                s.id === updatedSessionSeat.id ? updatedSessionSeat : s
              ),
            };
            await Ticket.findByIdAndUpdate(newTicket?.id, newTicket);
          });

        return updatedSessionSeat;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
