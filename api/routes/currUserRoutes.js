import { getCurrUser } from "../controllers/currUserController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.use(verifyToken);

router.get("/", getCurrUser);


export default router;