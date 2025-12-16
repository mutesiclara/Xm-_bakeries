import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../controllers/productController.js";

import { protect, restrictTo } from "../../middleware/authMiddleware.js";

const router = Router();

router.use(protect);

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.use(restrictTo("admin"));

router.post("/", createProduct);
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
