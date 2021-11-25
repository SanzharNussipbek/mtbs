const { model, Schema } = require("mongoose");

const SeatSchema = new Schema({
  seatNumber: Number,
  hallId: String,
  createdAt: String,
});

module.exports = model("Seat", SeatSchema);
