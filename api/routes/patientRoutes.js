import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatient,
  getAllPatients,
  loginPatient,
} from "../controllers/patientController.js";

import {
  loginSchema,
  patientSchema,
  validateBody,
} from "../middlewares/validationMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", validateBody(loginSchema), loginPatient);

router.use(verifyToken);

router.get("/", getAllPatients);

router.post("/", validateBody(patientSchema), createPatient);

router.delete("/:id", deletePatient);

router.get("/:id", getPatient);

export default router;
