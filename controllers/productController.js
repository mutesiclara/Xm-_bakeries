import pool from "../config/connect.js";

export const createProduct = async (req, res) => {
  const { product_name, category, price, quantity, description } = req.body;

  if (!product_name || !category || price == null) {
    return res.status(400).json({
      message: "Product name, category and price are required",
    });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO products 
       (product_name, category, price, quantity, description)
       VALUES (?, ?, ?, ?, ?)`,
      [product_name, category, price, quantity || 0, description || null]
    );

    res.status(201).json({
      message: "Product created successfully",
      product_id: result.insertId,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE product_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, category, price, quantity, description } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE products SET
        product_name = ?,
        category = ?,
        price = ?,
        quantity = ?,
        description = ?
       WHERE product_id = ?`,
      [product_name, category, price, quantity, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM products WHERE product_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minQty,
      maxQty,
      sortBy = "created_at",
      order = "desc",
    } = req.query;

    let query = "SELECT * FROM products WHERE 1=1";
    const values = [];

    /*//? Search by product name */
    if (search) {
      query += " AND product_name LIKE ?";
      values.push(`%${search}%`);
    }

    /*//? Filter by category */
    if (category) {
      query += " AND category LIKE ?";
      values.push(`%${category}%`);
    }

    /*//? Filter by price */
    if (minPrice) {
      query += " AND price >= ?";
      values.push(minPrice);
    }

    if (maxPrice) {
      query += " AND price <= ?";
      values.push(maxPrice);
    }

    /*//? Filter by quantity */
    if (minQty) {
      query += " AND quantity >= ?";
      values.push(minQty);
    }

    if (maxQty) {
      query += " AND quantity <= ?";
      values.push(maxQty);
    }

    /*//? Sorting (safe) */
    const allowedSortFields = [
      "product_name",
      "category",
      "price",
      "quantity",
      "created_at",
    ];

    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "created_at";

    const sortOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";

    query += ` ORDER BY ${sortField} ${sortOrder}`;

    const [products] = await pool.query(query, values);

    res.status(200).json({
      message: "Products fetched successfully!",
      results: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
