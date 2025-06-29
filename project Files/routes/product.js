const express = require("express");
const router = express.Router();
const Product = require("../models/product"); // ⬅ Make sure this is correctly imported

// POST /api/products (add a new product)
router.post("/", async (req, res) => {
  try {
    const { productname, description, price, image, category, countInStock, rating } = req.body;

    if (!productname || !description || !price || !image || !category || !countInStock || !rating) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const product = new Product({
      productname,
      description,
      price,
      image,
      category,
      countInStock,
      rating,
      dateCreated: new Date(),
    });

    await product.save();

    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;