require("dotenv").config();
require("./mongoose.js");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const artRouter = require("./routers/artRouter.js");

const app = express();

// ==== CONFIG ====
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// === ROUTES ===

// Home
app.get("/", (req, res) => {
  res.render("home");
});

// === ROUTERS ===
app.use("/art", artRouter);

// Auth middleware

// === 404 ===
app.use("/", (req, res) => {
  res.sendStatus(404);
});

//=== LISTEN ===
app.listen(6060, () => {
  console.log("http://localhost:6060/");
});
