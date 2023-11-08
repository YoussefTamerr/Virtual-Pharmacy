import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/:add", addToCart);

router.get("/:patientId", getCart);

router.delete("/:id/delete", removeFromCart);

router.patch("/:id/update", updateCartItem);

export default router;
