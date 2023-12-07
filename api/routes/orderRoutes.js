import {
  createOrder,
  getMyOrders,
  cancelOrder,
  createOrderCreditCard,
  getAllOrders,
} from "../controllers/orderController.js";

import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.use(verifyToken);

router.post("/", createOrder);

router.post("/cc", createOrderCreditCard); //stripe listen --forward-to localhost:5000/webhook

router.get("/me", getMyOrders);

router.patch("/:id", cancelOrder);

router.use(restrictTo(["Admin", "Pharmacist"]));

router.get("/", getAllOrders);

export default router;
