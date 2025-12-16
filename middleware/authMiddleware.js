import jwt from "jsonwebtoken";
import pool from "../config/connect.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in. Please login.",
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const [rows] = await pool.query(
      "SELECT id, email, role FROM users WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        status: "fail",
        message: "User belonging to this token no longer exists.",
      });
    }

    // 4. Attach user to request
    req.user = rows[0];
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message:
        error.name === "TokenExpiredError"
          ? "Token expired. Please login again."
          : "Invalid token. Please login again.",
    });
  }
};

export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action.",
      });
    }
    next();
  };
};
