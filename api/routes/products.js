const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

router.get("/", async (req, res, next) => {
  try {
    let result = await Product.find().exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
    });
    let result = await product.save();
    res.status(201).json({
      message: "Handle post req to /products",
      product: result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:prodId", async (req, res, next) => {
  try {
    const id = req.params.prodId;
    let doc = await Product.findById(id).exec();
    if (doc) res.status(200).json(doc);
    else res.status(404).json({ message: "Not a valid Id." });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/:prodId", (req, res, next) => {
  res.status(200).json({
    message: "Updated prod",
  });
});

router.delete("/:prodId", async (req, res, next) => {
  try {
    const id = req.params.prodId;
    let result = await Product.remove({ _id: id });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
