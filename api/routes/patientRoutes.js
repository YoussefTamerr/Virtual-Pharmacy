import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatient,
} from "../controllers/patientController.js";

import { 
  patientSchema, 
  validateBody, 
} from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/", validateBody(patientSchema), createPatient);

router.delete("/:id", deletePatient);

router.get("/:id", getPatient);

export default router;
