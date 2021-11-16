const { model, Schema } = require("mongoose");

const HallSchema = new Schema({
  name: String,
  type: String,
  totalSeats: Number,
});

module.exports = model("Hall", HallSchema);
