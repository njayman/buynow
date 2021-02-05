const Admin = require("../models/admin");
const Product = require("../models/product");

exports.registerAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.json({
      success: true,
      message: `Successfully registered as ${admin.fullname}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin && admin.password === req.body.password) {
      res.json({
        success: true,
        message: `Successfully logged in as ${admin.fullname}`,
      });
    } else if (admin && admin.password !== req.body.password) {
      res.json({
        success: false,
        message: `Password does not match for admin, ${admin.fullname}`,
      });
    } else {
      res.json({
        success: false,
        message: `No admin found with ${req.body.email}`,
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      res.json({
        success: true,
        message: `An email with password reset link is sent to email: ${admin.email}`,
      });
    } else {
      res.json({
        success: false,
        message: `No user found with ${req.body.email}`,
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
    const products = await Product.find();
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
    const product = await Product.findOne({ _id: req.params.id });
    res.json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
