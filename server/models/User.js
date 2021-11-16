const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  password: String,
  email: String,
  phone: String,
  tickets: [String],
  status: String,
  createdAt: String,
});

module.exports = model('User', UserSchema);
