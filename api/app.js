import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import adminRouter from "./routes/adminRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import pharmacistRouter from "./routes/pharmacistRoutes.js";
import medicineRouter from "./routes/medicineRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import authRouter from "./routes/authRoutes.js";
import prescriptionRouter from "./routes/prescriptionsRoutes.js";
import cookieParser from "cookie-parser";
import { stripeWebhook } from "./controllers/orderController.js";
import chatRoutes from "./routes/chatRoutes.js";
import currUserRoutes from "./routes/currUserRoutes.js";

import Medicine from "./models/medicineModel.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/webhook", express.json({ type: "application/json" }), stripeWebhook);

app.use("/admin", adminRouter);
app.use("/patient", patientRouter);
app.use("/pharmacist", pharmacistRouter);
app.use("/medicine", medicineRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/auth", authRouter);
app.use("/prescription", prescriptionRouter);
app.use("/chat", chatRoutes);
app.use("/currUser", currUserRoutes); 

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: `Cannot find ${req.originalUrl} on this server` });
});

const checkMedicineStock = async () => {
  console.log("Checking Medicine Stock");
  const medicines = await Medicine.find({ availableQuantity: 0 });
  return medicines;
};

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "virtual-clinic",
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App listening at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

export { checkMedicineStock }

export default app;
