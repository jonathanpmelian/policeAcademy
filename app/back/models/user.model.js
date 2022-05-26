const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: function (v) {
        return /\b([A-ZÀ-ÿ][-,a-z. '\\ ]{2,13})/.test(v);
      },
      message:
        "Name should be between 2 and 13 characters. First letter uppercase.",
    },
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
    validate: {
      validator: function (v) {
        return /\b([A-ZÀ-ÿ][-,a-z. '\\ ]{2,13})/.test(v);
      },
      message:
        "Surname should be between 2 and 13 characters. First letter uppercase.",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    validate: {
      validator: function (v) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["user", "officer", "director", "admin"],
    required: true,
    default: "user",
  },
  thefts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theft",
    },
  ],
  caseAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theft",
    default: null,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
    default: null,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
