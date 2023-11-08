import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.post("/:id", addToCart);

router.get("/:id", getCart);

router.delete("/:id", removeFromCart);

router.patch("/:id", updateCartItem);

export default router;
