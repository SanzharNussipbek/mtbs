const { model, Schema } = require("mongoose");

const SeatSchema = new Schema({
  seatNumber: Number,
  hallId: String,
});

module.exports = model("Seat", SeatSchema);
