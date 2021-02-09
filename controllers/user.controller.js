const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.registerUser = async (req, res) => {
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
            let tempuser = req.body;
            tempuser.password = hash;
            const user = new User(tempuser);
            await user.save();
            res.json({
              success: true,
              message: `Successfully registered as ${user.fullname}`,
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          res.json({ success: false, message: error.message });
        } else if (result) {
          var token = jwt.sign(
            {
              id: user._id,
              fullname: user.fullname,
              email: user.email,
              type: "user",
            },
            process.env.SECRET
          );
          res.json({ success: true, token: token });
        }
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

exports.manageCart = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      { $set: { cart: req.body.cart } }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.purchase = async (req, res) => {
  try {
    const User = await User.findOne({ _id: req.params.id });
    await User.updateOne(
      { _id: req.params.id },
      { $set: { cart: req.body.cart } }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
