import { Router } from "express";
import { signup, login } from "../../controllers/userControllers.js";
import { adminSignupMiddleware } from "../../middleware/adminSignupMiddleware.js";

const router = Router();

router.post("/signup", adminSignupMiddleware, signup);
router.post("/login", login);

export default router;
