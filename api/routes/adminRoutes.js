import { Router } from "express";
import { createAdmin, loginAdmin } from "../controllers/adminController.js";
import {
  adminSchema,
  loginSchema,
  validateBody,
} from "../middlewares/validationMiddleware.js";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", validateBody(loginSchema), loginAdmin);

router.use(verifyToken);

router.use(restrictTo(["Admin"]));

router.post("/", validateBody(adminSchema), createAdmin);

export default router;
