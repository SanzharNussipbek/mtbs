const Hall = require("../../models/Hall");
const Seat = require("../../models/Seat");
const Session = require("../../models/Session");
const Ticket = require("../../models/Ticket");
const SessionSeat = require("../../models/SessionSeat");
const { UserInputError } = require("apollo-server");
const { validateCreateHallInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getHalls() {
      try {
        const halls = await Hall.find()?.sort({ createdAt: -1 });
        return halls;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getHall(_, { id }) {
      try {
        const hall = await Hall.findById(id);
        if (!hall) {
          throw new Error("Hall not found");
        }
        return hall;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createHall(_, { data: { name, type, totalSeats } }, context) {
      const { valid, errors } = validateCreateHallInput(name, type, totalSeats);
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const newHall = new Hall({
        name,
        type,
        totalSeats,
        createdAt: new Date().toISOString(),
      });

      const hall = await newHall.save();

      return hall;
    },
    async deleteHall(_, { id }, context) {
      try {
        const hall = await Hall.findById(id);
        if (!hall) {
          throw new Error("Hall not found");
        }
        await hall.delete();

        const seats = await Seat.find({ hallId: id });
        seats?.map(async (seat) => await seat?.delete());

        const sessions = await Session.find({ hallId: id });
        sessions?.map(async (session) => {
          await session?.delete();

          const tickets = await Ticket.find({ sessionId: session.id });
          tickets?.map(async (ticket) => await ticket?.delete());

          const sessionSeats = await SessionSeat.find({ sessionId: session.id });
          sessionSeats?.map(async (sessionSeat) => await sessionSeat?.delete());
        });

        return "Hall deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
    async updateHall(_, { data }, context) {
      try {
        const { id, ...updateHallInput } = data;
        const hall = await Hall.findById(id);
        if (!hall) {
          throw new Error("Hall not found");
        }
        const updatedHall = await Hall.findByIdAndUpdate(id, updateHallInput, {
          new: true,
        });
        return updatedHall;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
