import { Router } from "express";
import { createPharmacist, deletePharmacist, getpharmacist } from "../controllers/pharmacistController.js";

const router = Router();

router.post("/", createPharmacist);

router.delete("/:id", deletePharmacist);

router.get("/:id" , getpharmacist);


export default router;
