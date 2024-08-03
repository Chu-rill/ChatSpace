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
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    // Update isActive field
    user.isActive = true;
    await user.save();

    // Generate token and set it in the cookies
    await generateToken(user._id, res);

    // Exclude password field manually before sending response
    const { password: pwd, ...userWithoutPassword } = user.toObject();

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
    console.error("Error after headers sent:", error);
  }
};

exports.logout = async (req, res) => {
  try {
    // Retrieve the user ID from the request parameters
    const { userId } = req.params;

    // Clear the JWT cookie
    res.cookie("jwt", "", { maxAge: 0 });

    // Find the user by ID and update the isActive field
    const user = await User.findById(userId);
    if (user) {
      user.isActive = false;
      const date = new Date();

      // Offset in milliseconds (1 hour = 3600000 milliseconds)
      const offset = 1 * 60 * 60 * 1000; // GMT+1
      const localDate = new Date(date.getTime() + offset);
      user.lastActive = localDate; // Set lastActive to the current time
      await user.save();
      res.status(200).json({ message: "Logged out Successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
