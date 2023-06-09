const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePagination = require("mongoose-paginate-v2");

const employeeSchema = new schema(
  {
    name: {
      type: String,
    },
    destination: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    avatar: {
      type: String,
    },
  },

  { timestamps: true }
);
employeeSchema.plugin(mongoosePagination);
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
