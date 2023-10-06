import { Router } from "express";

import { Router } from "express";
import { deletePatient } from "../controllers/patientController";

const router = Router();

router.delete("/:id", deletePatient);

export default router;
