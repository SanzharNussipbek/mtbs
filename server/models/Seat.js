const { model, Schema } = require("mongoose");

const SeatSchema = new Schema({
  hallId: String,
  seatNumber: Number
});

const Seat = model("Seat", SeatSchema);
module.exports = { Seat, SeatSchema };
