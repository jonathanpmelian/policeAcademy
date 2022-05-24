const mongoose = require("mongoose");

const theftSchema = new mongoose.Schema({
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
  },
  type: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "solved"],
    required: true,
    default: "pending",
  },
});

const TheftModel = mongoose.model("theft", theftSchema);
module.exports = TheftModel;
