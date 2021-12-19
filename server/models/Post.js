const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
  title: String,
  body: String,
  author: String,
  imgUrl: String,
  createdAt: String,
});

module.exports = model("Post", PostSchema);
