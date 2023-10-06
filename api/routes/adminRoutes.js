import { Router } from "express";
import { createAdmin } from "../controllers/adminController.js";

const router = Router();

router.post("/", createAdmin);

export default router;
