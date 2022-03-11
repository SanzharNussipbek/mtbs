const { model, Schema } = require("mongoose");

const FaqSchema = new Schema({
  title: String,
  body: String,
  createdAt: String,
});

const Faq = model("Faq", FaqSchema);
module.exports = { Faq, FaqSchema };
