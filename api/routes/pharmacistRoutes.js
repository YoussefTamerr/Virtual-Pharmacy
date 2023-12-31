import { Router } from "express";
import {
  createPharmacist,
  deletePharmacist,
  getPharmacist,
  getAllPharmacists,
  updatePharmacistApproval,
  loginPharmacist,
} from "../controllers/pharmacistController.js";

import {
  loginSchema,
  pharmacistSchema,
  validateBody,
} from "../middlewares/validationMiddleware.js";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import { uploadAndSavePharmacistDocs } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/login", validateBody(loginSchema), loginPharmacist);

router.post(
  "/",
  uploadAndSavePharmacistDocs,
  validateBody(pharmacistSchema),
  createPharmacist
);

router.use(verifyToken);

router.get("/", getAllPharmacists);

router.delete("/:id", deletePharmacist);

router.get("/:id", getPharmacist);

router.use(restrictTo(["Admin"]));

router.patch("/:id", updatePharmacistApproval);

export default router;
