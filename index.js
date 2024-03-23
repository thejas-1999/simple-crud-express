const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello world, I am a node server.`);
});

//view data
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

//recieve individual product
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      // If product with specified ID is not found, send 404 status
      return res.status(404).json({ message: "Product not found" });
    }
    // Send 200 status along with the product if found
    res.status(200).json(product);
  } catch (error) {
    // Send 500 status in case of server error
    res.status(500).json({ message: error.message });
  }
});

// add data
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update a product

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).json({ message: `Product not found` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete the product
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id); // Remove req.body
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: `Product deleted successfully` }); // Corrected typo in the message
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://ThejasK:Thejas1999@cluster0.iczrrlg.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Connected to database`);
    app.listen(3000, () => {
      console.log(`App running on http://localhost:3000`);
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error.message);
    process.exit(1); // Exit the process if connection fails
  });
