const User = require("../models/userModel");

const myProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updateData = req.body;

    console.log("Updating user:", userId);
    console.log("Data:", updateData);

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { myProfile };
