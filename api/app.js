import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import adminRouter from "./routes/adminRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import pharmacistRouter from "./routes/pharmacistRoutes.js";
import medicineRouter from "./routes/medicineRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

app.use("/admin", adminRouter);
app.use("/patient", patientRouter);
app.use("/pharmacist", pharmacistRouter);
app.use("/medicine", medicineRouter);
app.use("/cart", cartRouter);
app.post("/logout", verifyToken, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: `Cannot find ${req.originalUrl} on this server` });
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
