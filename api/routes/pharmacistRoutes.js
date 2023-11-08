import { Router } from "express";
import {
  createPharmacist,
  deletePharmacist,
  getPharmacist,
  getAllPharmacists,
  acceptPharmacist,
  rejectPharmacist,
  loginPharmacist,
} from "../controllers/pharmacistController.js";

import {
  loginSchema,
  pharmacistSchema,
  validateBody,
} from "../middlewares/validationMiddleware.js";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", validateBody(loginSchema), loginPharmacist);

router.use(verifyToken);

router.get("/", getAllPharmacists);

router.post("/", validateBody(pharmacistSchema), createPharmacist);

router.delete("/:id", deletePharmacist);

router.get("/:id", getPharmacist);

router.use(restrictTo(["Admin"]));

router.post("/:id", acceptPharmacist);

router.post("/:id", rejectPharmacist);

export default router;
