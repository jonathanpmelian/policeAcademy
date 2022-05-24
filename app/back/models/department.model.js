const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  officer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const DepartmentModel = mongoose.model("department", departmentSchema);
module.exports = DepartmentModel;
