import { getPrescriptions } from "../controllers/prescriptionsController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.use(verifyToken);

router.get("/", getPrescriptions);

export default router;