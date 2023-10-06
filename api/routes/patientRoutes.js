import { Router } from "express";
import { deletePatient } from "../controllers/patientController.js";

const router = Router();

router.delete("/:id", deletePatient);

export default router;
