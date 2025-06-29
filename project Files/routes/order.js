// routes/order.js
const express = require("express");
const router  = express.Router();
const Order   = require("../models/order");

// ─── 1) GET all orders ───────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ placedAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ GET /api/orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── 2) GET one order by ID (optional) ──────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("❌ GET /api/orders/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── 3) POST create a new order ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, phone, address, paymentMethod, items, total } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid or empty order items" });
    }

    const newOrder = new Order({
      firstName,
      lastName,
      phone,
      address,
      paymentMethod,
      items,
      total,
      placedAt: new Date(),
      status: "Pending"
    });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("❌ POST /api/orders error:", err);
    res.status(500).json({ message: "Error placing order" });
  }
});

// ─── 4) PUT update status ───────────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Missing status in request body" });
    }

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Status updated", order: updated });
  } catch (err) {
    console.error("❌ PUT /api/orders/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;