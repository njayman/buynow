const express = require("express");
const r = express.Router();

const {
  loginAdmin,
  registerAdmin,
  addProduct,
  getProduct,
  getProducts,
} = require("../controllers/admin.controller");
r.post("/register", registerAdmin);
r.post("/login", loginAdmin);
r.post("/product/add", addProduct);
r.get("/products/get", getProducts);
r.get("/product/get/:id", getProduct);

module.exports = r;
