const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await UserModel.findOne({ email });

    if (user) return res.status(409).json({ message: "User already exists", success: false });

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created", success: true });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Something went wrong", success: false, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password) return res.status(400).json({ message: "All fields are required", success: false });

    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ message: "Invalid credentials", success: false });
    }

    // Set token in HTTP-only cookie
    // res.cookie("token", jwt_token, { httpOnly: true, sameSite: "None", secure: true, maxAge: 12 * 60 * 60 * 1000});
    const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' } )

    // Send response
    res.status(200).json({ message: "Login successful", success: true, jwt_token: jwtToken, email: user.email, username: user.username, });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Something went wrong", success: false, error: error.message });
  }
};

module.exports = { register, login };
