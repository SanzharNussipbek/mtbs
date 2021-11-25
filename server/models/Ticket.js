const { model, Schema } = require("mongoose");

const TicketSchema = new Schema({
  sessionId: String,
  userId: String,
  price: String,
  status: String,
  timestamp: String,
  promocode: String,
  createdAt: String,
});

module.exports = model("Ticket", TicketSchema);
