import express from "express";
import {
  getAllMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

router.get("/", getAllMedicines);

router.post("/", createMedicine);

router.get("/:id", getMedicine);

router.patch("/:id", updateMedicine);

export default router;
