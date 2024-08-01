const User = require("../model/user_model");
const bcrypt = require("bcryptjs");

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
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
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
