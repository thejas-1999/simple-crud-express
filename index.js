const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello world, I am a node server.`);
});

// Receive data
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://ThejasK:Thejas1999@cluster0.iczrrlg.mongodb.net/Node-API?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
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
