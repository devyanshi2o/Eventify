const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Admin not found",
      });
    }

    // CHECK ADMIN ROLE
    if (user.role !== "admin") {

      return res.status(401).json({
        message: "Access Denied",
      });
    }

    // PASSWORD CHECK
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    res.json({
      success: true,

      admin: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },

      token: jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      ),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  adminLogin,
};