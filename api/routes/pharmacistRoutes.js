import { Router } from "express";
import {
  createPharmacist,
  deletePharmacist,
  getPharmacist,
  getAllPharmacists,
} from "../controllers/pharmacistController.js";

import { 
  pharmacistSchema, 
  validateBody, 
} from "../middlewares/validationMiddleware.js";

const router = Router();

router.get("/", getAllPharmacists);

router.post("/", validateBody(pharmacistSchema), createPharmacist);

router.delete("/:id", deletePharmacist);

router.get("/:id", getPharmacist);

export default router;
