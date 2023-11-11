import { Router } from "express";
import {
  logout,
  requestResetPassword,
  changePassword,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/reset-password", requestResetPassword);

router.post("/change-password/:id/:token", changePassword);

router.use(verifyToken);

router.get("/me", (req, res) => {
  res.json({ user: req.user });
});

router.post("/change-password", changePassword);

router.post("/logout", logout);

export default router;
