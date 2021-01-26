const express = require("express");
const app = express();
const register = require("./routes/registerUser");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/instagram_clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"));

app.use(express.json());
app.use("/api", register);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Serving on port 3000"));
