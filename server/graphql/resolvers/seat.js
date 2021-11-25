const Seat = require("../../models/Seat");
const { UserInputError } = require("apollo-server");
const { validateCreateSeatInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getSeat() {
      try {
        const seats = await Seat.find()?.sort({ createdAt: -1 });
        return seats;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getSeat(_, { seatId }) {
      try {
        const seat = await Seat.findById(seatId);
        if (!seat) {
          throw new Error("Seat not found");
        }
        return seat;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createSeat(_, { seatNumber, hallId }, context) {
      const { valid, errors } = validateCreateSeatInput(seatNumber, hallId);
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const newSeat = new Seat({
        seatNumber,
        hallId,
        createdAt: new Date().toISOString(),
      });

      const seat = await newSeat.save();

      return seat;
    },
    async deleteSeat(_, { seatId }, context) {
      try {
        const seat = await Seat.findById(seatId);
        if (!seat) {
          throw new Error("Seat not found");
        }
        await seat.delete();
        return "Seat deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
