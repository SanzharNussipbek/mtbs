const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
  title: String,
  body: String,
  author: String,
  imgUrl: String,
  sourceUrl: String,
  createdAt: String,
});

const Post = model("Post", PostSchema);
module.exports = { Post, PostSchema };