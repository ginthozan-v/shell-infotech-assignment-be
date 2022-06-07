import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
