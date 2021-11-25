const { model, Schema } = require("mongoose");

const SessionSeatSchema = new Schema({
  seatId: String,
  sessionId: String,
  ticketId: String,
  type: String,
  status: String,
  price: Number,
  createdAt: String,
});

module.exports = model("SessionSeat", SessionSeatSchema);
