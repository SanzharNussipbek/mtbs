const { model, Schema } = require("mongoose");

const SessionSchema = new Schema({
  movieId: String,
  hallId: String,
  date: String,
  startTime: String,
  endTime: String,
  createdAt: String,
});

module.exports = model("Session", SessionSchema);
