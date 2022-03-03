const { model, Schema } = require("mongoose");
const { MovieSchema } = require("./Movie");
const { HallSchema } = require("./Hall");
const { SessionSeatSchema } = require("./SessionSeat");

const SessionSchema = new Schema({
  movie: MovieSchema,
  hall: HallSchema,
  datetime: Number,
  seats: [SessionSeatSchema],
});

const Session = model("Session", SessionSchema);
module.exports = { Session, SessionSchema };
