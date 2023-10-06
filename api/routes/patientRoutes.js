import { Router } from "express";
import { createPatient, deletePatient, getpatient } from "../controllers/patientController.js";

const router = Router();

router.post("/", createPatient);

router.delete("/:id", deletePatient);

router.get("/:id" , getpatient);

export default router;
