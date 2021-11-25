const { model, Schema } = require("mongoose");

const HallSchema = new Schema({
  name: String,
  type: String,
  totalSeats: Number,
  createdAt: String,
});

module.exports = model("Hall", HallSchema);
