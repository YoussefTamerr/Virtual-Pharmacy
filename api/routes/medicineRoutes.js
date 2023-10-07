import express from "express";
import {
  getAllMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
} from "../controllers/medicineController.js";
import { medicineSchema, validateBody } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/", getAllMedicines);

router.post("/", validateBody(medicineSchema), createMedicine);

router.get("/:id", getMedicine);

router.patch("/:id", updateMedicine);

export default router;
