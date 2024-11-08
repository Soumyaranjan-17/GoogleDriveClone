const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/auth.middleware');
const { userValidationRules, validate } = require('../middlewares/validator.middleware');
const userController = require('../controllers/user.controller');

// AUTH pages rendering
router.get("/signup", (req, res) => {
  res.render("../views/signup");
});

router.get("/login", (req, res) => {
  res.render("../views/login");
});

// Auth pages post methods
router.post(
  "/signup",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 5 }),
  async (req, res) => {
    try {
      // Run the validation and get errors (if any)
      const errors = validationResult(req);

      // Check for validation errors
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid data",
        });
      }

      const { email, username, password } = req.body;

      // Check if username already exists
      const existingUser = await userModel.findOne({ 
        $or: [
          { username: username },
          { email: email }
        ]
      });

      if (existingUser) {
        return res.status(400).json({
          message: existingUser.username === username 
            ? "Username already exists" 
            : "Email already exists"
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        email,
        username,
        password: hashPassword,
      });

      res.render("signup-success");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.post(
  "/login",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data",
      });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Username or password is inncorect",
        });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET
      );

      res.cookie("token", token);
      res.render("login-success");
    }
  }
);

// User Profile
router.get('/profile', authMiddleware, (req, res) => {
    // Now you can access user data through req.user
    res.render('../views/profile', {
        username: req.user.username,
        email: req.user.email
    });
});

router.post('/register', 
    userValidationRules(), 
    validate,
    userController.register
);

module.exports = router;
