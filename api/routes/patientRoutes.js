import { Router } from "express";
import { deletePatient, getpatient } from "../controllers/patientController.js";

const router = Router();

router.delete("/:id", deletePatient);

router.get("/:id" , getpatient);

export default router;
