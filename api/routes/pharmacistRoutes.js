import { Router } from "express";
import { deletePharmacist, getpharmacist } from "../controllers/pharmacistController.js";

const router = Router();

router.delete("/:id", deletePharmacist);

router.get("/:id" , getpharmacist);


export default router;
