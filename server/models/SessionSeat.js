const { model, Schema } = require("mongoose");
const { SeatSchema } = require("./Seat");

const SessionSeatSchema = new Schema({
  seat: SeatSchema,
  type: { type: String },
  status: String,
  price: String,
});

const SessionSeat = model("SessionSeat", SessionSeatSchema);
module.exports = { SessionSeat, SessionSeatSchema };
