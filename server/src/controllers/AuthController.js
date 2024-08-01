const User = require("../model/user_model");
const bcrypt = require("bcryptjs");
const getRandomUrl = require("../model/profileImages");
const generateToken = require("../../utils/generateToken");
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //query database for username and email
    const user = await User.findOne({ username });
    const userEmail = await User.findOne({ email });

    //check if user or email exist
    if (user || userEmail) {
      return res.status(400).json({ error: "Username already exist" });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Get a random profile picture URL
    const profilePicture = await getRandomUrl();

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      profilePicture: profilePicture || "", // Use the random URL or an empty string if none is found
    });

    if (newUser) {
      await generateToken(newUser._id, res);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  console.log("login");
};
exports.logout = async (req, res) => {
  console.log("logout");
};
