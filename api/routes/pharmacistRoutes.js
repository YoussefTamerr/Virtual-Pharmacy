import { Router } from "express";

import { Router } from "express";
import { deletePharmacist } from "../controllers/pharmacistController";

const router = Router();

router.delete("/:id", deletePharmacist);

export default router;
