import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatient,
  getAllPatients,
  loginPatient,
  addDeliveryAddress,
  chooseDefaultAddress,
} from "../controllers/patientController.js";

import {
  loginSchema,
  patientSchema,
  validateBody,
} from "../middlewares/validationMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", validateBody(patientSchema), createPatient);

router.post("/login", validateBody(loginSchema), loginPatient);

router.use(verifyToken);

router.get("/", getAllPatients);

router.delete("/:id", deletePatient);

router.get("/:id", getPatient);

router.post("/delivery-address/:id", addDeliveryAddress);

router.patch("/delivery-address/:id", chooseDefaultAddress);

export default router;
