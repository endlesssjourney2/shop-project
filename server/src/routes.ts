import { Router } from "express";
import db from "./db";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const productsCollection = db.collection("products");
const ordersCollection = db.collection("orders");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2025-11-17.clover",
});

// PAYMENTS

router.post("/payments/create-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
    const amountInMinorUnits = Math.round(Number(amount) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInMinorUnits,
      currency: currency || "usd", 
      
      automatic_payment_methods: {
        enabled: true,
      },
      description: "Order payment for the shop project", 
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

//ORDERS

// CREATE
router.post("/orders", async (req, res) => {
  try {
    const { items } = req.body as {
      items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        photoUrl?: string;
      }>;
    };

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const total = items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    const docRef = await ordersCollection.add({
      items,
      total,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// READ all
router.get("/orders", async (_, res) => {
  try {
    const snapshot = await ordersCollection.orderBy("createdAt", "desc").get();
    const orders: any[] = [];
    snapshot.forEach((doc) => orders.push({ id: doc.id, ...doc.data() }));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// DELETE
router.delete("/orders/:id", async (req, res) => {
  try {
    const docRef = ordersCollection.doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: "Order not found" });

    await docRef.delete();
    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// CREATE
router.post("/products", async (req, res) => {
  try {
    const { name, price, category, description, photoUrl, specs } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Missing required fields: name, price, category",
      });
    }
    const docRef = await productsCollection.add({
      name,
      price: Number(price),
      category,
      description,
      photoUrl,
      specs,
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

//PRODUCTS

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
    const { name, price, category, description, photoUrl, specs } = req.body;
    const docRef = productsCollection.doc(req.params.id);
    await docRef.update({
      name,
      price: Number(price),
      category,
      description,
      photoUrl,
      specs,
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

    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    await docRef.delete();
    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
