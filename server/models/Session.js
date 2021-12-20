const { model, Schema } = require("mongoose");
const { MovieSchema } = require("./Movie");
const { HallSchema } = require("./Hall");

const SessionSchema = new Schema({
  movie: MovieSchema,
  hall: HallSchema,
  date: String,
  startTime: String,
  endTime: String,
});

const Session = model("Session", SessionSchema);
module.exports = { Session, SessionSchema };
