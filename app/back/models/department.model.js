const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: function (v) {
        return /\b([A-ZÀ-ÿ][-,a-z. '\\ ]{2,30})/.test(v);
      },
      message:
        "Name should be between 2 and 30 characters. First letter uppercase.",
    },
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Director is required"],
    unique: true,
  },
  officers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
    },
  ],
});

const DepartmentModel = mongoose.model("department", departmentSchema);
module.exports = DepartmentModel;
