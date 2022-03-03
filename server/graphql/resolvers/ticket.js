const { Ticket } = require("../../models/Ticket");
const { Session } = require("../../models/Session");
const { SessionSeat } = require("../../models/SessionSeat");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");
const { validateCreateTicketInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getAllTickets() {
      try {
        const tickets = await Ticket.find()?.sort({ createdAt: -1 });
        return tickets;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getTicket(_, { id }) {
      try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
          throw new Error("Ticket not found");
        }
        return ticket;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getTicketsByUserId(_, { userId }) {
      try {
        const tickets = await Ticket.find({ userId })?.sort({ createdAt: -1 });
        return tickets;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createTicket(
      _,
      { data: { sessionId, seatIds, userId, price, promocode } },
      context
    ) {
      const { valid, errors } = await validateCreateTicketInput(
        sessionId,
        seatIds,
        userId,
        price
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }

      const session = await Session.findById(sessionId);

      let seats = [];
      for (let i = 0; i < seatIds?.length; i++) {
        const sessionSeat = await SessionSeat.findByIdAndUpdate(
          seatIds[i],
          {
            status: "BOOKED",
          },
          {
            new: true,
          }
        );
        seats.push(sessionSeat);
      }

      const newTicket = new Ticket({
        session,
        seats,
        userId,
        price,
        status: "BOOKED",
        promocode,
        createdAt: new Date().toISOString(),
      });

      const ticket = await newTicket.save();

      const user = await User.findById(ticket?.userId);
      let newTickets = user?.tickets;
      newTickets?.push(ticket);
      await User.findByIdAndUpdate(user?.id, { tickets: newTickets });

      return {
        ...ticket._doc,
        id: ticket.id,
      };
    },
    async deleteTicket(_, { id }, context) {
      try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
          throw new Error("Ticket not found");
        }

        const user = await User.findById(ticket?.userId);
        const newTickets = user?.tickets?.filter((id) => id !== ticket?.id);
        await User.findByIdAndUpdate(user.id, { tickets: newTickets });

        const session = await Session.findById(ticket.sessionId);
        session?.seats?.map(async (seat) => {
          await SessionSeat.findByIdAndUpdate(seat?.id, { status: "VACANT" });
        });
        
        await ticket.delete();
        return "Ticket deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
    async updateTicket(
      _,
      { data: { id, sessionId, seatIds, userId, price, status, promocode } },
      context
    ) {
      try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
          throw new Error("Ticket not found");
        }

        const { valid, errors } = await validateCreateTicketInput(
          sessionId,
          seatIds,
          userId,
          price,
          status
        );
        if (!valid) {
          throw new UserInputError("Errors", {
            errors,
          });
        }

        const session = Session.findById(sessionId);

        let seats = [];
        for (let i = 0; i < seatIds?.length; i++) {
          const sessionSeat = await SessionSeat.findById(seatIds[i]);
          seats.push(sessionSeat);
        }

        const updateTicketInput = {
          session,
          seats,
          userId,
          price,
          status,
        };

        const updatedTicket = await Ticket.findByIdAndUpdate(
          id,
          updateTicketInput,
          {
            new: true,
          }
        );

        const user = await User.findById(updatedTicket?.userId);
        let newTickets = user?.tickets;
        newTickets.map((ticket) =>
          ticket?.id === updatedTicket?.id ? updatedTicket : ticket
        );
        await User.findByIdAndUpdate(user.id, { tickets: newTickets });

        return updatedTicket;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
