import { Router } from "express";
import {
  createPharmacist,
  deletePharmacist,
  getPharmacist,
  getAllPharmacists,
  acceptPharmacist,
  rejectPharmacist,
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

//router.post(,acceptPharmacist); //lel accept


//router.post(,rejectPharmacist); //lel reject

export default router;
