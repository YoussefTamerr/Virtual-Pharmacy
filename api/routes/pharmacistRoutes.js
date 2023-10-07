import { Router } from "express";
import {
  createPharmacist,
  deletePharmacist,
  getPharmacist,
} from "../controllers/pharmacistController.js";

import { 
  pharmacistSchema, 
  validateBody, 
} from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/", validateBody(pharmacistSchema), createPharmacist);

router.delete("/:id", deletePharmacist);

router.get("/:id", getPharmacist);

export default router;
