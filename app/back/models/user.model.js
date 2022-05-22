const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "officer", "director", "admin"],
    required: true,
    default: "user",
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
