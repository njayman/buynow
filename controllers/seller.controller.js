const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/product");
const Seller = require("../models/seller");

exports.registerSeller = async (req, res) => {
  try {
    console.log(req.body);
    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) {
            console.log(err);
            res.json({ success: false, message: err.message });
          } else {
            let tempseller = req.body;
            tempseller.password = hash;
            const seller = new Seller(tempseller);
            await seller.save();
            res.json({
              success: true,
              message: `Successfully registered as ${seller.fullname}`,
            });
          }
        });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.loginSeller = async (req, res) => {
  try {
    const seller = await Seller.findOne({ email: req.body.email });
    if (seller) {
      bcrypt.compare(
        req.body.password,
        seller.password,
        function (err, result) {
          if (err) {
            console.log(err);
            res.json({ success: false, message: error.message });
          } else if (result) {
            var token = jwt.sign(
              {
                id: seller._id,
                fullname: seller.fullname,
                email: seller.email,
                type: "seller",
              },
              process.env.SECRET
            );
            res.json({ success: true, token: token });
          }
        }
      );
    } else if (seller && seller.password !== req.body.password) {
      res.json({
        success: false,
        message: `Password does not match for seller, ${seller.fullname}`,
      });
    } else {
      res.json({
        success: false,
        message: `No seller found with ${req.body.email}`,
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const seller = await Seller.findOne({ email: req.body.email });
    if (seller) {
      res.json({
        success: true,
        message: `An email with password reset link is sent to email: ${seller.email}`,
      });
    } else {
      res.json({
        success: false,
        message: `No seller found with ${req.body.email}`,
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({
      success: true,
      message: `Product was created successfully`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerid: req.params.sellerid });
    res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      sellerid: req.params.sellerid,
    });
    res.json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
