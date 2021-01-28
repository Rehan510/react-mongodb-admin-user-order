const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = require("./src/Route/route");
mongoose.connect("mongodb://localhost:27017/ProjectAdmin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", userRouter);
app.listen(9992, () => {
  console.log("Server up at 9992");
});
