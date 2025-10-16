import { Router } from "express";
import db from "./db";

const router = Router();

// CREATE
router.post("/products", (req, res) => {
  const { name, price, category } = req.body;
  const stmt = db.prepare(
    "INSERT INTO products (name, price, category) VALUES (?, ?, ?)"
  );
  const info = stmt.run(name, price, category);
  res.json({ id: info.lastInsertRowid });
});

// READ all
router.get("/products", (_, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

router.get("/products/:id", (req, res) => {
  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// UPDATE
router.put("/products/:id", (req, res) => {
  const { name, price, category } = req.body;
  const stmt = db.prepare(
    "UPDATE products SET name=?, price=?, category=? WHERE id=?"
  );
  const result = stmt.run(name, price, category, req.params.id);
  res.json({ updated: result.changes });
});

// DELETE
router.delete("/products/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM products WHERE id=?");
  const result = stmt.run(req.params.id);
  res.json({ deleted: result.changes });
});

export default router;
