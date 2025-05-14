const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
express.urlencoded({ extended: true });
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

const AppRoute = require("./AppRoute.js");

app.get("/", (req, res) => {
  res.send("This is Online Shop App using NodeJS and ExpressJS");
});

const port = process?.env?.PORT ?? 3000;
AppRoute(app);
app.listen(port, () => {
  console.log("This server is running on port " + port);
});
