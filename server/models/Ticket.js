const { model, Schema } = require("mongoose");
const { SessionSchema } = require("./Session");
const { SessionSeatSchema } = require("./SessionSeat");

const TicketSchema = new Schema({
  session: SessionSchema,
  seats: [SessionSeatSchema],
  userId: String,
  price: Number,
  status: String,
  promocode: String,
  createdAt: String,
});

const Ticket = model("Ticket", TicketSchema);
module.exports = { Ticket, TicketSchema };
