const User = require("../models/User.model.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const {
      username,
      email,
      password,
    } = req.body;

    // Check if user exists
    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // Find user
    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Compare Password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// GET TOTAL USERS
const getUsers = async (
  req,
  res
) => {

  try {

    const users =
      await User.find();

    res.status(200).json({

      success: true,

      data: users,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers
};