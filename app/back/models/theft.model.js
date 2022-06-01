const mongoose = require("mongoose");

const theftSchema = new mongoose.Schema({
  licenseNumber: {
    type: String,
    required: [true, "License Number is required"],
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
    required: [true, "Color is required"],
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
    required: [true, "Type is required"],
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
    required: [true, "Owner is required"],
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
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
    required: [true, "Address is required"],
    validate: {
      validator: function (v) {
        return /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/.test(v);
      },
      message: "Special characters and symbols are not allowed",
    },
  },
  geoPoints: {
    type: Array,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "solved"],
    required: [true, "Status is required"],
    default: "pending",
  },
  assignation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const TheftModel = mongoose.model("theft", theftSchema);
module.exports = TheftModel;
