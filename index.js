import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import employeesRoutes from './routes/employees.js'

const app = express();

app.use('/employees', employeesRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// mongodb
const CONNECTION_URL =
  "mongodb+srv://ginthu:ginthu1234@cluster0.ddns4ek.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`🟢 Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(`❌ ${error.message}`));