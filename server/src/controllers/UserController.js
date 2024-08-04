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
exports.editProfile = async (req, res) => {
  try {
    const { username, Bio } = req.body;
    const userId = req.user._id; // Assuming you have the user's ID in req.user._id

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, Bio },
      { new: true, runValidators: true } // options: return the updated document and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};
