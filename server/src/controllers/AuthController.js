const User = require("../model/user_model");

exports.registerUser = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
