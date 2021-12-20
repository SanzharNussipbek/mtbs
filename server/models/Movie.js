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
  imgUrl: String,
});

const Movie = model("Movie", MovieSchema);
module.exports = { Movie, MovieSchema };
