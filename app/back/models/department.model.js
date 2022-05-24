const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
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
