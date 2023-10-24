import { Router } from "express";
import { createAdmin, loginAdmin } from "../controllers/adminController.js";
import {
  adminSchema,
  validateBody,
} from "../middlewares/validationMiddleware.js";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", validateBody(adminSchema), loginAdmin);

router.use(verifyToken);

router.use(restrictTo(["Admin"]));

router.post("/", validateBody(adminSchema), createAdmin);

export default router;
