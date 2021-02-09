const { model, Schema } = require("mongoose");
const DepartmentSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);
module.exports = model("department", DepartmentSchema);
