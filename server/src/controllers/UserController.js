const User = require("../model/user_model");

exports.getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // const allUsers = await User.find() add yourself to the sidebar
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};
