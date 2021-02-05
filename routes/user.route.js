const express = require("express");
const r = express.Router();

const { registerUser, loginUser } = require("../controllers/user.controller");
r.post("/register", registerUser);
r.post("/login", loginUser);
module.exports = r;
