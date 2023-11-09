import {
    createOrder,
    getMyOrders,
    cancelOrder,
} from "../controllers/orderController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.use(verifyToken);

router.post("/", createOrder);

router.get("/", getMyOrders);

router.patch("/:id", cancelOrder);

export default router;