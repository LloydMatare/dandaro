import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // or use 'bcrypt'
import generateToken from "../services/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
    });
  } catch (error) {
    console.log(`Error in the login controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(`Error in the logout controller ${error.message}`);
    res.status(500).json("Internal server error");
  }
};

export const register = async (req, res) => {
  const { fullName, email, password, confirmPassword, gender } = req.body;

  try {
    // Validate input
    if (!fullName || !email || !password || !gender || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "Please fill in all required details" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = await User({
      fullName,
      email,
      password: hashedPassword,
      gender,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      // Respond (omit password)
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          gender: newUser.gender,
        },
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error(`Error in create user controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
