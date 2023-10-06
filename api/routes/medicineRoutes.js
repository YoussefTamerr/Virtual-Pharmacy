import express from "express";
import {
  getAllMedicines,
  getMedicine,
  searchMedicine,
  createMedicine,
  updateMedicine
} from "../controllers/medicineController.js";

const router = express.Router();

router.get("/", getAllMedicines);

router.get("/:id", getMedicine);

router.post("/search", searchMedicine);

router.get("/add", createMedicine);

router.patch("/:id" ,updateMedicine);

export default router;
