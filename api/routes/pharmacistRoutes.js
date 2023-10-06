import { Router } from "express";
import {
  createPharmacist,
  deletePharmacist,
  getPharmacist,
} from "../controllers/pharmacistController.js";

const router = Router();

router.post("/", createPharmacist);

router.delete("/:id", deletePharmacist);

router.get("/:id", getPharmacist);

export default router;
