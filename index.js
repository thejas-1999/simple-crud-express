const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const ProductRoute = require("./routes/product.route.js");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", ProductRoute);

mongoose
  .connect(
    "mongodb+srv://ThejasK:password@cluster0.iczrrlg.mongodb.net/Abc?retryWrites=true&w=majority"
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
