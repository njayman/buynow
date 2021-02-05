const User = require("../models/user");

exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({
      success: true,
      message: `Successfully registered as ${user.fullname}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.password === req.body.password) {
      res.json({
        success: true,
        message: `Successfully logged in as ${user.fullname}`,
      });
    } else if (user && user.password !== req.body.password) {
      res.json({
        success: false,
        message: `Password does not match for user, ${user.fullname}`,
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

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({
        success: true,
        message: `An email with password reset link is sent to email: ${user.email}`,
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
