import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // or use 'bcrypt'

export const login = (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(401).json("Inavlid credentials");
    }
  } catch (error) {
    console.log(`Error in the login controller ${error.message}`);
    res.status(500).json("Internal server error");
  }
};

export const register = async (req, res) => {
  const { fullName, email, password, gender } = req.body;

  try {
    // Validate input
    if (!fullName || !email || !password || !gender) {
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
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      gender,
    });

    // Respond (omit password)
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    console.error(`Error in create user controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
