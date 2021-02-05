const express = require("express");
const r = express.Router();

const {
  loginSeller,
  registerSeller,
  addProduct,
  getProducts,
  getProduct,
} = require("../controllers/seller.controller");
r.post("/register", registerSeller);
r.post("/login", loginSeller);
r.post("/product/add", addProduct);
r.get("/products/get/:sellrid", getProducts);
r.get("/product/get/:id/:sellerid", getProduct);

module.exports = r;
