const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  licenseNumber: {
    type: String,
    required: true,
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
    enum: ["pending", "assigned", "closed"],
    required: true,
    default: "pending",
  },
});

const BikeModel = mongoose.model("bike", bikeSchema);
module.exports = BikeModel;
