const express = require("express");
const router = express.Router();

// Routes import
const routes = require("./routes");

module.exports = (app) => {
  routes(router); // ➡ Gọi hàm routes với tham số là router. (→ routes/index.js)
  app.use("/api", router); // ➡ Gắn router vào /api/. (→ /api/products)
};
