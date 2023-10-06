import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatient,
} from "../controllers/patientController.js";

const router = Router();

router.post("/", createPatient);

router.delete("/:id", deletePatient);

router.get("/:id", getPatient);

export default router;
