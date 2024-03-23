const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send(`Hello world iam node server updated`);
});

mongoose
  .connect(
    "mongodb+srv://ThejasK:Thejas1999@cluster0.iczrrlg.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Connected to database`);
    app.listen(3000, () => {
      console.log(`app running on http://localhost:3000`);
    });
  })
  .catch(() => console.log(`Connection failed`));
