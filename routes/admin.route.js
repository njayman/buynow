const express = require("express");
const r = express.Router();

const {
  loginAdmin,
  registerAdmin,
  addProduct,
} = require("../controllers/admin.controller");
r.post("/register", registerUser);
r.post("/login", loginUser);
r.post("/product/add", addProduct);
r.get("/products/get", getProducts);
r.get("/product/get/:id", getProduct);

module.exports = r;
