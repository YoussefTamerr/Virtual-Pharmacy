import {
    createOrder,
    getMyOrders,
    cancelOrder,
    createOrderCreditCard,
} from "../controllers/orderController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.use(verifyToken);

router.post("/", createOrder);

router.post("/cc", createOrderCreditCard); //stripe listen --forward-to localhost:5000/webhook

router.get("/", getMyOrders);

router.patch("/:id", cancelOrder);

export default router;