import {
    createOrder,
    getMyOrders,
    cancelOrder,
    createOrderCreditCard,
    stripeWebhook
} from "../controllers/orderController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import bodyParser from 'body-parser';

const router = express.Router();

router.use(verifyToken);

router.post("/", createOrder);

router.post("/cc", createOrderCreditCard); //stripe listen --forward-to localhost:5000/order/webhook

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

router.get("/", getMyOrders);

router.patch("/:id", cancelOrder);

export default router;