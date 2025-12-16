import express from "express";
import dotenv from "dotenv";
import pool from "./config/connect.js";
import userRouter from "./routes/users/userRoutes.js";
import adminRouter from "./routes/admin/adminRoutes.js";
import productsRouter from "./routes/products/productRoutes.js";

dotenv.config({ path: `./config.env` });

const app = express();

// Middleware
app.use(express.json());

app.get("/", function (req, res) {
  res
    .status(200)
    .json({ status: true, message: "Welcome to the bakeries api" });
});

app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", productsRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
