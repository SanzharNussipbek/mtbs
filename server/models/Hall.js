const { model, Schema } = require("mongoose");
const { SeatSchema } = require("./Seat");

const HallSchema = new Schema({
  name: String,
  type: { type: String },
  seats: [SeatSchema],
});

const Hall = model("Hall", HallSchema);
module.exports = { Hall, HallSchema };
