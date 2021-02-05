const express = require("express");
const r = express.Router();

const {
  loginAdmin,
  registerAdmin,
  addProduct,
  getProducts,
  getProduct,
} = require("../controllers/admin.controller");
r.post("/register", registerAdmin);
r.post("/login", loginAdmin);
r.post("/product/add", addProduct);
r.get("/products/get/:sellrid", getProducts);
r.get("/product/get/:id/:sellerid", getProduct);

module.exports = r;
