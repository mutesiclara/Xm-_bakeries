import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config({ path: `./config.env` });

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// Test connection
try {
  const connection = await pool.getConnection();
  console.log("✅ MySQL connected using pool");
  connection.release();
} catch (error) {
  console.error("❌ MySQL connection failed:", error.message);
}

export default pool;
