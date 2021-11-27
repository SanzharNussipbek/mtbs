const Seat = require("../../models/Seat");
const { UserInputError } = require("apollo-server");
const { validateCreateSeatInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getSeats() {
      try {
        const seats = await Seat.find()?.sort({ createdAt: -1 });
        return seats;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getSeat(_, { id }) {
      try {
        const seat = await Seat.findById(id);
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
    async createSeat(_, { data: { seatNumber, hallId } }, context) {
      const { valid, errors } = await validateCreateSeatInput(
        seatNumber,
        hallId
      );
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
    async deleteSeat(_, { id }, context) {
      try {
        const seat = await Seat.findById(id);
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
