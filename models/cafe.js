import mongoose from "mongoose";

const cafeSchema = mongoose.Schema({
  name: String,
  description: String,
  employees: [
    {
      employee_id: String,
      name: String,
      startedAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  logo: String,
  location: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Cafe = mongoose.model("Cafe", cafeSchema);
export default Cafe;
