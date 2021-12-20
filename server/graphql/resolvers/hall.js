const { Hall } = require("../../models/Hall");
const { Seat } = require("../../models/Seat");
const { Session } = require("../../models/Session");
const { SessionSeat } = require("../../models/SessionSeat");
const { Ticket } = require("../../models/Ticket");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");
const { validateCreateHallInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getAllHalls() {
      try {
        const halls = await Hall.find();
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
    async createHall(_, { data: { name, type, seatIds } }, context) {
      const { valid, errors } = await validateCreateHallInput(
        name,
        type,
        seatIds
      );

      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }

      let seats = [];
      for(let i = 0; i < seatIds?.length; i++) {
        const seat = await Seat.findById(id);
        seats.push(sessionSeat);
      }

      const newHall = new Hall({
        name,
        type,
        seats,
      });

      const hall = await newHall.save();

      return {
        ...hall._doc,
        id: hall.id,
      };
    },
    async deleteHall(_, { id }, context) {
      try {
        const hall = await Hall.findById(id);
        if (!hall) {
          throw new Error("Hall not found");
        }

        hall.seats?.map(async (seat) => {
          const theSeat = await Seat.findById(seat?.id);
          await theSeat?.delete();
        });

        const sessions = await Session.find();
        sessions
          ?.filter((session) => session?.hall?.id == hall.id)
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

        await hall.delete();

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

        let seats = [];
        for(let i = 0; i < updateHallInput?.seatIds?.length; i++) {
          const seat = await Seat.findById(id);
          seats.push(sessionSeat);
        }

        const newHall = {
          name: updateHallInput?.name,
          type: updateHallInput?.type,
          seats: seats,
        };

        const updatedHall = await Hall.findByIdAndUpdate(id, newHall, {
          new: true,
        });

        const sessions = await Session.find();
        sessions
          ?.filter((session) => session?.hall?.id == updatedHall?.id)
          ?.map(async (session) => {
            const newSession = { ...session, hall: updatedHall };
            await Session.findByIdAndUpdate(newSession?.id, newSession);
          });

        return updatedHall;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
