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
  bikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bike",
    },
  ],
  caseAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bike",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
