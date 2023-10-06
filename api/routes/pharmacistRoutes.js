import { Router } from "express";
import { deletePharmacist } from "../controllers/pharmacistController.js";

const router = Router();

router.delete("/:id", deletePharmacist);

export default router;
