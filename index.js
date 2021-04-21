const express = require("express");
const cors = require("cors");
const app = express();
const register = require("./routes/user");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"));

app.use(cors());
app.use(express.json());
app.use("/api/register", register);
app.use("/api/login", auth);

const port = process.env.PORT || 3900;
app.listen(port, () => console.log("Serving on port 3000"));
