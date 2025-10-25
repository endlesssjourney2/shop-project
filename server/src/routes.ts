import { Router } from "express";
import db from "./db";
import * as admin from "firebase-admin";

const router = Router();
const productsCollection = db.collection("products");

// CREATE
router.post("/products", async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const docRef = await productsCollection.add({
      name,
      price: Number(price),
      category,
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// READ all
router.get("/products", async (_, res) => {
  try {
    const snapshot = await productsCollection.get();
    const products: any[] = [];

    snapshot.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// READ one
router.get("/products/:id", async (req, res) => {
  try {
    const docRef = productsCollection.doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// UPDATE
router.put("/products/:id", async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const docRef = productsCollection.doc(req.params.id);
    await docRef.update({
      name,
      price: Number(price),
      category,
    });
    res.json({ updated: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// DELETE
router.delete("/products/:id", async (req, res) => {
  try {
    const docRef = productsCollection.doc(req.params.id);
    await docRef.delete();
    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
