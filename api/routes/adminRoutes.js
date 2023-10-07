import { Router } from "express";
import { createAdmin } from "../controllers/adminController.js";
import { 
  adminSchema, 
  validateBody, 
} from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/", validateBody(adminSchema), createAdmin);


export default router;
