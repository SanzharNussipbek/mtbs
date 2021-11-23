const { model, Schema } = require("mongoose");

const MovieSchema = new Schema({
  name: String,
  description: String,
  duration: String,
  language: String,
  releaseDate: String,
  country: String,
  genre: String,
  director: String,
  cast: String,
  rating: String,
  createdAt: String,
  imgUrl: String,
});

module.exports = model("Movie", MovieSchema);
