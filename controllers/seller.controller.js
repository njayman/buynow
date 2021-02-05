const Seller = require("../models/seller");
const Product = require("../models/product");

exports.registerSeller = async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.json({
      success: true,
      message: `Successfully registered as ${seller.fullname}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.loginSeller = async (req, res) => {
  try {
    const seller = await Seller.findOne({ email: req.body.email });
    if (seller && seller.password === req.body.password) {
      res.json({
        success: true,
        message: `Successfully logged in as ${seller.fullname}`,
      });
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
    const product = new Product(req.body.product);
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
