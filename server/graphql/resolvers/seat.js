const { Seat } = require("../../models/Seat");
const { Hall } = require("../../models/Hall");
const { SessionSeat } = require("../../models/SessionSeat");
const { UserInputError } = require("apollo-server");
const { validateCreateSeatInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getAllSeats() {
      try {
        const seats = await Seat.find();
        return seats;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getHallSeats(_, { hallId }) {
      try {
        const seats = await Seat.find({ hallId });
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
      });

      const seat = await newSeat.save();

      const hall = await Hall.findById(hallId);
      const newHall = await Hall.findByIdAndUpdate(
        hallId,
        { ...hall, seats: hall.seats?.push(seat) },
        { new: true }
      );

      return {
        ...seat._doc,
        id: seat.id,
      };
    },
    async deleteAllSeats(_, {}, context) {
      await Seat.deleteMany();
      await Hall.updateMany(
        {},
        {
          seats: [],
        }
      );
      return "All seats are deleted successfully";
    },
    async deleteSeat(_, { id }, context) {
      try {
        const seat = await Seat.findById(id);
        if (!seat) {
          throw new Error("Seat not found");
        }

        const sessionSeats = await SessionSeat.find();
        sessionSeats
          ?.filter((sessionSeat) => sessionSeat?.seat?.id == seat?.id)
          ?.map(async (sessionSeat) => await sessionSeat?.delete());

        const hall = await Hall.findById(seat.hallId);
        const newSeats = hall?.seats?.filter((item) => item.id !== seat.id);
        const newHall = await Hall.findByIdAndUpdate(
          seat.hallId,
          { seats: newSeats },
          {
            new: true,
          }
        );

        await seat.delete();

        return "Seat deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
    async updateSeat(_, { data }, context) {
      try {
        const { id, ...updateSeatInput } = data;
        const seat = await Seat.findById(id);
        if (!seat) {
          throw new Error("Seat not found");
        }
        const updatedSeat = await Seat.findByIdAndUpdate(id, updateSeatInput, {
          new: true,
        });
        const halls = await Hall.find();
        halls
          ?.filter((hall) => hall?.seats?.indexOf(seat) !== -1)
          ?.map(async (hall) => {
            const newHall = {
              ...hall,
              seat: hall.seats.map((s) =>
                s.id === updatedSeat.id ? updatedSeat : s
              ),
            };
            await Hall.findByIdAndUpdate(newHall?.id, newHall);
          });
        const sessionSeatss = await SessionSeat.find();
        sessionSeatss
          ?.filter((sessionSeat) => sessionSeat?.seat?.id == updatedSeat?.id)
          ?.map(async (sessionSeat) => {
            const newSessionSeat = { ...sessionSeat, seat: updatedSeat };
            await SessionSeat.findByIdAndUpdate(
              newSessionSeat?.id,
              newSessionSeat
            );
          });
        return updatedSeat;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
