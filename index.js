require("dotenv").config();
require("./mongoose.js");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const artRouter = require("./routers/artRouter.js");
const userRouter = require("./routers/userRouter.js");

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

// Auth middleware
app.use((req, res, next) => {
  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.JWT_SECRET)) {
    const tokenData = jwt.decode(token, process.env.JWT_SECRET);
    res.locals.loggedIn = true;
    res.locals.username = tokenData.username;
    res.locals.id = tokenData._id;
  } else {
    res.locals.loggedIn = false;
  }

  next();
});

// === ROUTERS ===
app.use("/art", artRouter);
app.use("/user", userRouter);

// === 404 ===
app.use("/", (req, res) => {
  res.sendStatus(404);
});

//=== LISTEN ===
app.listen(6060, () => {
  console.log("http://localhost:6060/");
});
