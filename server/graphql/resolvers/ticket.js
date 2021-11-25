const Ticket = require("../../models/Ticket");
const { UserInputError } = require("apollo-server");
const { validateCreateTicketInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getTicket() {
      try {
        const tickets = await Ticket.find()?.sort({ createdAt: -1 });
        return tickets;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getTicket(_, { ticketId }) {
      try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
          throw new Error("Ticket not found");
        }
        return ticket;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createTicket(
      _,
      { sessionId, userId, price, status, timestamp, promocode },
      context
    ) {
      const { valid, errors } = validateCreateTicketInput(
        sessionId,
        userId,
        price,
        status,
        timestamp,
        promocode
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const newTicket = new Ticket({
        sessionId,
        userId,
        price,
        status,
        timestamp,
        promocode,
        createdAt: new Date().toISOString(),
      });

      const ticket = await newTicket.save();

      return ticket;
    },
    async deleteTicket(_, { ticketId }, context) {
      try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
          throw new Error("Ticket not found");
        }
        await ticket.delete();
        return "Ticket deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
