import express from "express";
import {
  getAllMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
  archiveMedicine,
  unarchiveMedicine,
} from "../controllers/medicineController.js";
import {
  medicineSchema,
  validateBody,
} from "../middlewares/validationMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { uploadAndSaveMedicineImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getAllMedicines);

router.post(
  "/",
  uploadAndSaveMedicineImage,
  validateBody(medicineSchema),
  createMedicine
);

router.get("/:id", getMedicine);

router.patch("/:id", updateMedicine);

router.patch("/archive/:id", archiveMedicine);

router.patch("/unarchive/:id", unarchiveMedicine);

export default router;
