import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import adminRouter from "./routes/adminRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import pharmacistRouter from "./routes/pharmacistRoutes.js";
import medicineRouter from "./routes/medicineRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use("/patient", patientRouter);
app.use("/pharmacist", pharmacistRouter);
app.use("/medicine", medicineRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({ message: "page not found" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "balabizo-pharmacy",
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App listening at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

export default app;
