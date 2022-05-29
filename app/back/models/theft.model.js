const mongoose = require("mongoose");

const theftSchema = new mongoose.Schema({
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^(\d{4})([A-Z]{3})$/.test(v);
      },
      message: "License Number format is 4 Digits plus 3 uppercase letters.",
    },
  },
  color: {
    type: String,
    validate: {
      validator: function (v) {
        return /\b([A-ZÀ-ÿ][-,a-z. '\\ ]{2,13})/.test(v);
      },
      message:
        "Color should be between 3 and 13 characters. First letter uppercase.",
    },
  },
  type: {
    type: String,
    validate: {
      validator: function (v) {
        return /\b([A-ZÀ-ÿ][-,a-z. '\\ ]{3,13})/.test(v);
      },
      message:
        "Type should be between 3 and 10 characters. First letter uppercase.",
    },
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
    validate: {
      validator: function (v) {
        return /\b([A-ZÀ-ÿ][-,a-z. '\\ ]{2,250})/.test(v);
      },
      message:
        "Description should be between 2 and 250 characters. First letter uppercase.",
    },
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
  assignation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const TheftModel = mongoose.model("theft", theftSchema);
module.exports = TheftModel;
