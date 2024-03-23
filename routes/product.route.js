const express = require("express");
const Product = require("../models/product.model.js");
const {
  getProducts,
  getOneProduct,
  addProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");
const router = express.Router();

//view all products
router.get("/", getProducts);

//view one product
router.get("/:id", getOneProduct);

//add products
router.post("/", addProducts);

//update product
router.put("/:id", updateProduct);

//delete the product
router.delete("/:id", deleteProduct);

module.exports = router;
