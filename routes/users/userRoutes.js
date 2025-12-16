import { Router } from "express";
import { signup, login } from "../../controllers/userControllers.js";
import { userSignupMiddleware } from "../../middleware/userSignupMiddleware.js";

const router = Router();

router.post("/signup", userSignupMiddleware, signup);
router.post("/login", login);

export default router;
