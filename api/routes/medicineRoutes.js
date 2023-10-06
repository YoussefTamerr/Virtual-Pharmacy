import express from "express";
import {
  getAllMedicines,
  getMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

router.get("/", getAllMedicines);

router.get("/:id", getMedicine);

export default router;
